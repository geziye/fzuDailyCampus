export interface dailyCampusFormValue {
  title: string
  value: string | string[]
}

export interface campusConfig {
  host: string                // 学校主机名
  Cookie: string              // 抓包得到
  address: string             // 定位的地址
  defaults: dailyCampusFormValue[] // 默认填写的title和值
  abnormalReason: string      // 每日签到的不在的原因 (例如不在校)
  longitude: string           // 位置的经度 (对应address的经纬度)
  latitude: string            // 位置的纬度
  isMalposition: number        // 0 -> 在学校 1 -> 不在学校
  userEmail: string           // 填你的qq邮箱
  emailSecret: string         // qq邮箱授权密钥
}

const config: campusConfig = {
  'emailSecret': '',
  'userEmail': '',
  'abnormalReason': '不在校',
  'longitude': '',
  'latitude': '',
  'isMalposition': 1,
  'host': 'fzu.cpdaily.com',
  'address': '',
  'Cookie': '',
  'defaults': [{
    title: '今日所在位置',
    value: '福建省/福州市/晋安区'
  }, {
    title: '昨日午检体温',
    value: '小于37.3度'
  }, {
    title: '今日晨检体温',
    value: '小于37.3度'
  }, {
    title: '今日健康状况（可多选）',
    value: ['健康，无症状']
  }, {
    title: '家庭成员是否有确诊感染、疑似感染新冠肺炎患者或无症状感染者',
    value: '否'
  }, {
    title: '今日是否为入院状态（入院指生病住院）',
    value: '否'
  }, {
    title: '目前是否为新冠肺炎确诊/疑似病例或无症状感染者（若选“是“，必须已与就诊医生确认）',
    value: '否'
  }, {
    title: '今日隔离情况',
    value: '无需隔离'
  }, {
    title: '今日是否因与确诊病人有密切接触，被当地强制隔离中',
    value: '否'
  }, {
    title: '今日是否因有发热、咳嗽、乏力、呼吸困难等疑似症状在隔离中',
    value: '否'
  }, {
    title: '近14日以来，你接触过疫情重点地区流出人员或确诊/疑似新冠肺炎患者等情况',
    value: '无此类情况'
  }, {
    title: '近14日以来，你居住、旅行、途经疫情重点地区情况',
    value: '无此类情况'
  }, {
    title: '是否在今日入闽',
    value: '否'
  }, {
    title: '住址是否在今日有变动',
    value: '否'
  }, {
    title: '近14日以来，你的共同居住者（包括家庭成员、共同租住人员、共同居住房东家庭成员）有无以下特殊情况（可多选）',
    value: ['无以下特殊情况']
  }, {
    title: '本人承诺以上所填报的全部内容均属实、准确，不存在任何隐瞒与不实的情况，更无遗漏之处。',
    value: '是'
  }]
}

export default config
