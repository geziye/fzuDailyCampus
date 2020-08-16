/**
 * @author Huro
 * @description 保证cookie活性
 */

import config from './conf'
import * as moment from 'moment';
import axios from 'axios'
import { keepAliveFailInfo } from './model/error.model'
import { queryCollectorResponseData } from './interface/response.interface'
import { QUERY_COLLECTOR_PROCESSING_LISTV_URL } from './conf/url.config'

const { headers } = config

const keepAlive = async () => {
  try {
    const res = await axios.post(QUERY_COLLECTOR_PROCESSING_LISTV_URL, { pageSize: 2, pageNumber: 1 }, { headers })
    const data: queryCollectorResponseData = res.data
    const str = moment().format()
    if (data.message === "SUCCESS") {
      console.log(`成功保活, 当前时间${str}`)
      return
    }
    console.error(keepAliveFailInfo)
  } catch (ex) {
    console.error(ex.message, ex.stack)
  }
}

keepAlive()