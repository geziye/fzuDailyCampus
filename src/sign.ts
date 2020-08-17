// /**
//  * @author Huro
//  * @description 主文件
//  */

// import axios from 'axios'
// import config from './conf'
// import {
  
// } from './model/error.model'
// import { SuccessModel, ErrorModel } from './model/res.model'

// import {
//   GetMySignResponseData
// } from './interface/response.interface'

// const { headers, api, custom } = config
// const { address } = custom


// const getFormWidAndCollectorWid = async () => {
//   const { QUERY_COLLECTOR_PROCESSING_LISTV_URL } = api
//   const res = await axios.post(QUERY_COLLECTOR_PROCESSING_LISTV_URL, { pageNumber: 1, pageSize: 2 }, { headers })
//   const data: GetMySignResponseData = res.data
//   const { datas, code } = data
//   const { rows } = datas
//   if (!rows.length || code !== '0') {
//     return new ErrorModel(questionnaireNotReleasedInfo)
//   }
//   const { formWid, wid: collectorWid } = rows[0]
//   return new SuccessModel({ formWid, collectorWid })
// }


// const bootstrap = async () => {

// }

// bootstrap()
