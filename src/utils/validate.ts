// 项目名称校验规则
const validateName = (rule: any, value: any, callback: any) => {
  const reg = '^[\u4E00-\u9FA5A-Za-z0-9_-]+$'
  if (value === '') {
    callback(new Error('请输入项目名称'))
  } else if (value.length > 20) {
    callback(new Error('长度不可超过20个字符'))
  } else if (!value.match(reg)) {
    callback(new Error('允许输入中文,英文,数字，‘-’和‘_’'))
  } else {
    callback()
  }
}

// IP校验规则
const validateIP = (rule: any, value: any, callback: any) => {
  // eslint-disable-next-line no-useless-escape
  const reg = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\.' + '(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$'
  if (value === '') {
    callback(new Error('请输入IP'))
  } else if (value.indexOf(',')) {
    const list = value.split(',')
    if (list.some((item:string) => !item.match(reg))) {
      callback(new Error('请正确输入IP并用英文半角逗号分隔隔开'))
    } else {
      callback()
    }
  } else if (!value.match(reg)) {
    callback(new Error('请正确输入IP并用英文半角逗号分隔隔开'))
  } else {
    callback()
  }
}

// 账号
const validateUserName = (rule: any, value: any, callback: any) => {
  const reg = '^[A-Za-z0-9_-]+$'
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (value.length > 8) {
    callback(new Error('长度不可超过8个字符'))
  } else if (value.length < 6) {
    callback(new Error('长度不可小于6个字符'))
  } else if (!value.match(reg)) {
    callback(new Error('允许输入英文,数字，‘-’和‘_’'))
  } else {
    callback()
  }
}

// 密码
const validatePassword = (rule: any, value: any, callback: any) => {
  const reg = '^[A-Za-z0-9_-]+$'
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length > 16) {
    callback(new Error('长度不可超过8个字符'))
  } else if (value.length < 8) {
    callback(new Error('长度不可小于8个字符'))
  } else if (!value.match(reg)) {
    callback(new Error('允许输入英文,数字，‘-’和‘_’'))
  } else {
    callback()
  }
}

export {
  validateName,
  validateIP,
  validateUserName,
  validatePassword
}
