/**
 * @author Huro
 * @description 邮件发送
 */

import * as nodemailer from 'nodemailer'
import * as moment from 'moment'
import config from '../conf/index'
const { mailConfig: EMAIL_CONF } = config
const smtpTransport = nodemailer.createTransport(EMAIL_CONF)
const { user } = EMAIL_CONF.auth

async function mail({
  subject = '自动签到程序反馈信息',
  text,
  from = user,
  to = user
}) {
  try {
    const info = await smtpTransport.sendMail({
      from,
      to,
      subject,
      text
    })
    console.log(`${moment().format('YYYY-MM-DD HH:mm:ss')} 发送邮件成功`)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    console.error('发送邮件失败')
  }
}

export default mail
