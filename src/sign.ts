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
  GetSignInfoResponseData
} from './interface/response.interface'
import mail from './util/mail'

const { headers, api, custom } = config
const { address, abnormalReason, isMalposition, longitude, latitude } = custom


const getSignInfo = async () => {
  const { GET_SIGN_INFO_URL } = api
  const res = await axios.post(GET_SIGN_INFO_URL, { pageNumber: 1, pageSize: 2 }, { headers })
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

const submitSignInfo = async (signInstanceWid: number) => {
  const { SUBMIT_SIGN_URL } = api
  const res = await axios.post(SUBMIT_SIGN_URL, {
    position: address,
    signInstanceWid,
    longitude,
    latitude,
    isMalposition,
    abnormalReason,
    signPhotoUrl: ''
  }, { headers })
  const data = res.data
  console.log(data.message)
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
  const { signInstanceWid } = getSignInfoData.data
  const submitSignInfoData = await submitSignInfo(signInstanceWid)
  if (submitSignInfoData.errno !== '0') {
    console.error('今日校园签到失败')
    mail({ text: submitSignInfoData.message })
    return
  }
  console.log('自动化每日签到完成')
  mail({ text: '自动化每日签到完成' })
}

bootstrap()
