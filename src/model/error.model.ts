/**
 * @author Huro
 * @description 错误信息 model
 */


export const questionnaireNotReleasedInfo = {
  errno: '10001',
  message: '今日问卷还未发布'
}

export const getDetailCollectorFailInfo = {
  errno: '10002',
  message: '获取今日校园问卷详情失败'
}

export const getFormFiledsFailInfo = {
  errno: '10003',
  message: '获取今日校园提交表单信息失败'
}

export const formConfigErrorInfo = {
  errno: '10004',
  message: '表单配置不正确, 请检查'
}

export const formTypeNotExpected = {
  errno: '10005',
  message: '没有处理这种类型的表单组件'
}

export const formSubmitFailInfo = {
  errno: '10006',
  message: '提交表单失败'
}

export const keepAliveFailInfo = {
  errno: '10007',
  message: '登录cookie保活失败'
}

export const unknowndError = {
  errno: '99999',
  message: '发生了未知错误，请联系代码作者'
}

