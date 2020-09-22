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

// 119.199024,26.056624

const config: campusConfig = {
  'emailSecret': '',
  'userEmail': '',
  'abnormalReason': '在校',
  'longitude': '119.203150',
  'latitude': '26.062701',
  'isMalposition': 0,
  'host': 'fzu.cpdaily.com',
  'address': '福州大学第二田径场',
  'Cookie': '',
  'defaults': []
}

export default config
