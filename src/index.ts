/**
 * @author Huro
 * @description 主文件
 */

import axios from 'axios'
import config from './conf'
import {
  questionnaireNotReleasedInfo,
  getDetailCollectorFailInfo,
  getFormFiledsFailInfo,
  formConfigErrorInfo,
  formTypeNotExpected,
  unknowndError,
  formSubmitFailInfo
} from './model/error.model'
import { SuccessModel, ErrorModel } from './model/res.model'

import {
  DetailCollectorResponseData,
  queryCollectorResponseData,
  FormResponseData,
  FormRow
} from './interface/response.interface'

const { headers, api, custom } = config
const { defaults, address } = custom


const getFormWidAndCollectorWid = async () => {
  const { QUERY_COLLECTOR_PROCESSING_LISTV_URL } = api
  const res = await axios.post(QUERY_COLLECTOR_PROCESSING_LISTV_URL, { pageNumber: 1, pageSize: 2 }, { headers })
  const data: queryCollectorResponseData = res.data
  const { datas, code } = data
  const { rows } = datas
  if (!rows.length || code !== '0') {
    return new ErrorModel(questionnaireNotReleasedInfo)
  }
  const { formWid, wid: collectorWid } = rows[0]
  return new SuccessModel({ formWid, collectorWid })
}

const getSchoolTaskWid = async (collectorWid: string) => {
  const { DETAIL_COLLECTOR_URL } = api
  const res = await axios.post(DETAIL_COLLECTOR_URL, { collectorWid }, { headers })
  const data: DetailCollectorResponseData = res.data
  if (data.code !== '0') {
    return new ErrorModel(getDetailCollectorFailInfo)
  }

  const { datas } = data
  const { collector } = datas
  const { schoolTaskWid } = collector
  return new SuccessModel({ schoolTaskWid })
}

const getFormInfo = async (formWid: string, collectorWid: string) => {
  const { GET_FORM_FIELDS_URL } = api
  const res = await axios.post(GET_FORM_FIELDS_URL, {
    pageSize: 50,
    pageNumber: 1,
    formWid,
    collectorWid
  }, { headers })
  const data: FormResponseData = res.data
  const { datas, code } = data
  const { rows } = datas
  if (code !== '0') {
    return new ErrorModel(getFormFiledsFailInfo)
  }
  return new SuccessModel({ form: rows })
}

const fillForm = async (form: FormRow[]) => {
  const defaultMap = new Map<string, string | string[]>()
  defaults.forEach(defaultValue => {
    const { title, value } = defaultValue
    defaultMap.set(title, value)
  })
  const submitForm = form.filter(item => {
    // 必填项目
    if (item.isRequired === 1) {
      // 置空
      item.value = ''
      const { title, fieldType, fieldItems } = item
      if (!defaultMap.has(title)) {
        return new ErrorModel(formConfigErrorInfo)
      }
      const defaultValue = defaultMap.get(title)
      switch (fieldType) {
        // 文本框 或 级联选择框
        case 1:
          item.value = defaultValue as string
          break;
        // 单选
        case 2:
          item.value = defaultValue as string
          item.fieldItems = fieldItems.filter((field) => field.content === defaultValue)
          break;
        // 多选
        case 3:
          item.fieldItems = fieldItems.filter((field) => {
            if (defaultValue.includes(field.content)) {
              item.value += field.content + ''
              return true
            }
            return false
          })
        default:
          return new ErrorModel(formTypeNotExpected)
      }
      return true
    }
    return false
  })
  return new SuccessModel({ submitForm })
}

const submitForm = async (
  form: FormRow[],
  formWid: string,
  collectWid: string,
  schoolTaskWid: string,
) => {
  const { SUBMIT_FORM_URL } = api
  const res = await axios.post(SUBMIT_FORM_URL, {
    form,
    formWid,
    collectWid,
    schoolTaskWid,
    address
  }, {
    headers
  })
  const { data } = res
  const { message } = data
  if (message === 'SUCCESS' || message === '该收集已填写无需再次填写' || message === '该收集已结束！') {
    console.log(message)
    return new SuccessModel(message)
  }
  console.log(data)
  return new ErrorModel(formSubmitFailInfo)
}

const bootstrap = async () => {
  try {
    console.log('自动化填报程序开始执行')
    console.log('正在查询最新问卷')
    const getFromData = await getFormWidAndCollectorWid()
    if (getFromData.errno !== '0') {
      console.error(getFromData)
      return
    }
    console.log('正在获取问卷详情信息')
    const { formWid, collectorWid } = getFromData.data
    const getSchoolData = await getSchoolTaskWid(collectorWid)
    if (getSchoolData.errno !== '0') {
      console.error(getSchoolData)
      return
    }
    const { schoolTaskWid } = getSchoolData.data
    console.log('正在获取问卷表单信息')
    const getFormData = await getFormInfo(formWid, collectorWid)
    if (getFormData.errno !== '0') {
      console.error(getFormData)
      return
    }
    const { form } = getFormData.data
    console.log('正在填写表单信息')
    const fillFormData = await fillForm(form)
    if (fillFormData.errno !== '0') {
      console.error(fillFormData)
      return
    }
    const { submitForm: formData } = fillFormData.data
    console.log('正在提交表单信息')
    const submitFormData = await submitForm(formData, formWid, collectorWid, schoolTaskWid)
    if (submitFormData.errno !== '0') {
      console.error(submitFormData)
      return
    }
    console.log('表单完成提交. 提交成功')
  } catch (ex) {
    console.error(ex.message, ex.stack)
    console.error(new ErrorModel(unknowndError))
  }
}

bootstrap()
