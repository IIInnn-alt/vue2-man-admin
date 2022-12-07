/*
 * @Author: mn
 * @Date: 2022-06-13 15:10:21
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 10:03:20
 * @Description:  more see https://any86.github.io/any-rule/
 */

/**
 * @param {string} path
 * @returns {Boolean}
 * @description: 检查是否为外链
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 * @description: 判断是否是传统网站
 */
export function validURL(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description 判断是否是端口号
 * @param value
 * @returns {boolean}
 */
export function validPort(value) {
  const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(value)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 判断是否是小写字母
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 判断是否是大写字母
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 * @description 校验邮箱    ^((?!你的正则表达式).)*$
 */
export function validEmail(email) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !reg.test(email)
}

/**
 * @description 判断是否是手机号
 * @param value
 * @returns {boolean}
 */
export function validPhone(value) {
  const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
  return !reg.test(value)
}

/**
 * @description 判断是否为固话
 * @param value
 * @returns {boolean}
 */
export function isTel(value) {
  const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/
  return reg.test(value)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 判断是否为空
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value) {
  return (
    value === null || value === '' || String(value).trim() === '' || String(value).toLocaleLowerCase().trim() === 'null'
  )
}

/**
 * 判断是否为空
 */
export function validateNull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}

/**
 * @param {string} str
 * @returns {Boolean} 只能输入整数
 */
export function validNumber1(str) {
  const reg = /^[0-9]+$/
  return !reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean} 只能输入整数或小数
 */
export function validNumber(str) {
  const reg = /^[0-9]+([.]{1}[0-9]+){0,1}$/
  return !reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description  英文字符和数字
 */
export function validNumOrEng(str) {
  const reg = /[^a-zA-Z0-9]/g
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description  是否中文
 */
export function validChinese(str) {
  const reg = /[\u4e00-\u9fa5]/g
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description  密码中允许出现数字、大写字母、小写字母、特殊字符（~.!@#$%^&*?），但至少包含其中2种且长度在6-16之间（四种符号任取其二或三）
 */
export function validPwd(str) {
  const reg = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~.!@#$%^&*?]+$)[\da-zA-z~.!@#$%^&*?]{6,16}$/
  return !reg.test(str)
}

/**
 * @description: form表单 rulus 自定义验证
 * see https://github.com/yiminghe/async-validator#type
 * @param {*} type  校验类型
 * @param {*} required
 * @param {*} name  名称
 * @param {*} nameType  input or select
 * @param {*} min  default 1
 * @param {*} max
 * @param {*} validFun  本js文件的 的函数名
 * @param {*} validFunTip  提示名称
 */
export function validRules({ type, required = true, name, nameType = 'input', min = 1, max, validFun, validFunTip }) {
  let validArr = []
  validArr.push({
    type,
    required,
    message: (nameType == 'input' ? '请输入' : '请选择') + name,
    trigger: nameType == 'input' ? 'blur' : ['blur', 'change']
  })
  if (max) {
    validArr.push({
      min,
      max,
      message: name + `长度在 ${min} 到  ${max} 个字符`,
      trigger: ['blur', 'change']
    })
  }
  if (validFun) {
    validArr.push({
      validator: (rule, value, callback) => {
        if (!isEmpty(value)) {
          let reg = /^[^\s]*$/ //是否含有空格 false --> 有
          if (reg.test(value)) {
            if (eval(validFun) && eval(validFun)(value)) {
              callback(new Error(validFunTip))
            } else {
              callback()
            }
          } else {
            callback(new Error(`${name}不能含有空格`))
          }
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change']
    })
  }
  return validArr
}
