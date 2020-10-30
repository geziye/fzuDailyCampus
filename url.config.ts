import customConfig from './custom.config'
const { host } = customConfig

export const SUBMIT_FORM_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/submitForm`
export const DETAIL_COLLECTOR_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/detailCollector`
export const QUERY_COLLECTOR_PROCESSING_LISTV_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/queryCollectorProcessingList`
export const GET_FORM_FIELDS_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/getFormFields`
export const GET_SIGN_INFO_URL = `https://${host}/wec-counselor-sign-apps/stu/sign/queryDailySginTasks`
export const SUBMIT_SIGN_URL = `https://${host}/wec-counselor-sign-apps/stu/sign/completeSignIn`
export const DETAIL_SIGN_INSTANCE_URL = `https://${host}/wec-counselor-sign-apps/stu/sign/detailSignTaskInst`
#又有接口变了，所以我改动了一下，签到成功，接口变动好频繁
