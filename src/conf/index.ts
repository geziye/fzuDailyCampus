import customConfig from './custom.config'
import headersConfig from './headers.config'
import * as api from './url.config'
import mailConfig from './mail.config'
const { Cookie, host, userEmail, emailSecret, ...custom } = customConfig

export default { 
  api, 
  custom,
  headers: { Cookie, host, ...headersConfig },
  mailConfig: { ...mailConfig, auth: { user: userEmail, pass: emailSecret } }
}