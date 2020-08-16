import customConfig from './custom.config'
import headersConfig from './headers.config'
import * as api from './url.config'
const { Cookie, host, ...custom } = customConfig

export default { 
  api, 
  custom,
  headers: { Cookie, host, ...headersConfig }
}