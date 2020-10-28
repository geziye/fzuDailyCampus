/**
 * @author Huro
 * @description 主文件
 */

import axios from 'axios'
import config from './conf'
import {
  getSignInfoFailInfo, submitSignInfoFailInfo
} from './model/error.model'
import { SuccessModel, ErrorModel } from './model/res.model'
import {
  GetSignInfoResponseData,
  detailSignInstanceData
} from './interface/response.interface'
import mail from './util/mail'

const { headers, api, custom } = config
const { address, abnormalReason, isMalposition, longitude, latitude } = custom


const getSignInfo = async () => {
  const { GET_SIGN_INFO_URL } = api
  const res = await axios.post(GET_SIGN_INFO_URL, {}, { headers })
  const data: GetSignInfoResponseData = res.data
  const { code, datas } = data
  if (code !== '0') {
    return new ErrorModel(getSignInfoFailInfo)
  }
  const { unSignedTasks } = datas
  if (unSignedTasks.length <= 0) {
    return new ErrorModel(getSignInfoFailInfo)
  }
  const { signWid, signInstanceWid } = unSignedTasks[0]
  return new SuccessModel({ signWid, signInstanceWid })
}

const getDetailSignInstance = async (signInstanceWid: number, signWid: number) => {
  const { DETAIL_SIGN_INSTANCE_URL } = api
  const res = await axios.post(DETAIL_SIGN_INSTANCE_URL, {
    signInstanceWid,
    signWid
  }, { headers })
  const data: detailSignInstanceData = res.data
  const { datas } = data
  const { isNeedExtra, extraField } = datas
  if (isNeedExtra !== 1) {
    return new SuccessModel('没有需要额外填写的项目')
  }
  const extraFieldItemValues = []
  extraField.forEach(field => {
    const { extraFieldItems } = field
    const { wid, content } = extraFieldItems[0]
    const extraFieldItemValue = {
      extraFieldItemValue: content,
      extraFieldItemWid: wid
    }
    extraFieldItemValues.push(extraFieldItemValue)
  })
  return new SuccessModel({ extraFieldItemValues })
}

const submitSignInfo = async (signInstanceWid: string, extraFieldItems: any) => {
  const { SUBMIT_SIGN_URL } = api
  const form = {
    position: address,
    signInstanceWid: parseInt(signInstanceWid),
    longitude,
    latitude,
    isMalposition: 0,
    abnormalReason,
    extraFieldItems
  }
  console.log(form)
  const res = await axios.post(SUBMIT_SIGN_URL, form, { headers })
  const data = res.data
  console.log(data)
  if (data.message === 'SUCCESS') {
    return new SuccessModel('表单提交成功')
  }
  return new ErrorModel(submitSignInfoFailInfo)
}

const bootstrap = async () => {
  console.log('自动化每日签到程序启动')
  const getSignInfoData = await getSignInfo()
  if (getSignInfoData.errno !== '0') {
    console.error('获取签到信息失败')
    mail({ text: getSignInfoData.message })
    return
  }
  const { signInstanceWid, signWid } = getSignInfoData.data
  const detailSignInstanceData = await getDetailSignInstance(signInstanceWid, signWid)
  if (detailSignInstanceData.errno !== '0') {
    console.error('获取签到详情信息失败')
    mail({ text: detailSignInstanceData.message })
    return
  }
  const { extraFieldItemValues } = detailSignInstanceData.data
  const submitSignInfoData = await submitSignInfo(signInstanceWid, extraFieldItemValues)
  if (submitSignInfoData.errno !== '0') {
    console.error('今日校园签到失败')
    mail({ text: submitSignInfoData.message })
    return
  }
  console.log('自动化每日签到完成')
  mail({ text: '自动化每日签到完成' })
}

bootstrap()
