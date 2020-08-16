import customConfig from './custom.config'
const { host } = customConfig

export const SUBMIT_FORM_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/submitForm`
export const DETAIL_COLLECTOR_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/detailCollector`
export const QUERY_COLLECTOR_PROCESSING_LISTV_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/queryCollectorProcessingList`
export const GET_FORM_FIELDS_URL = `https://${host}/wec-counselor-collector-apps/stu/collector/getFormFields`