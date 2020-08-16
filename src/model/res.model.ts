/**
 * @author Huro
 * @description 存放错误信息 model
 */

interface baseModelProps {
  errno: string
  data?: any
  message?: string
}

class BaseModel {
  errno: string
  data: any
  message: string
  constructor({ errno, data, message }: baseModelProps) {
    this.errno = errno
    if (data)
      this.data = data
    if (message)
      this.message = message
  }
}

export class SuccessModel extends BaseModel {
  constructor(data) {
    super({ errno: '0', data })
  }
}

export class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({ errno, message })
  }
}
