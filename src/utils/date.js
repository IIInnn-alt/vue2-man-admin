/*
 * @Author: mn
 * @Date: 2022-07-14 09:57:21
 * @LastEditors: mn
 * @LastEditTime: 2022-11-03 09:10:54
 * @Description: 时间相关格式化
 */
/**
 * 时间格式化
 * @param {*} date
 * @param {*} fmt
 * 使用 let nowDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * @param value 值
 * @param fmt 日期格式
 * @param type 0为默认形式,1为日历模式,不写则使用默认形式
 */
//js中使用  this.$options.filters.dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss",1);
//vue中使用 '2019-01-01' | dateFormat("yyyy-MM-dd hh:mm:ss",1);=
// dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss',1)
export const dateFormat = (value, fmt, type) => {
  if (type) return ifDate(value, fmt)
  else return timeTo(value, fmt)

  //判断当前返回的是星期几
  function week(dayNum) {
    if (dayNum == 7) return '日'
    else if (dayNum == 1) return '一'
    else if (dayNum == 2) return '二'
    else if (dayNum == 3) return '三'
    else if (dayNum == 4) return '四'
    else if (dayNum == 5) return '五'
    else if (dayNum == 6) return '六'
  }

  function timeTo(value, fmt) {
    if (!value || value == '') return value
    if (typeof value == 'string' && value.indexOf('.') > -1) value = value.split('.')[0] //时间格式带小数点则需把小数点后面的尾数去掉
    let getDate = new Date(value)
    let o = {
      'M+': getDate.getMonth() + 1,
      'd+': getDate.getDate(),
      'h+': getDate.getHours(),
      'm+': getDate.getMinutes(),
      's+': getDate.getSeconds(),
      'q+': Math.floor((getDate.getMonth() + 3) / 3),
      S: getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return fmt
  }

  function ifDate(value, fmt) {
    if (!value || value == '') return value
    let date = new Date(new Date().toLocaleDateString()).getTime() //获取当前时间时间戳
    let perDate = new Date(new Date(value).toLocaleDateString()).getTime()
    let day = parseInt((date - perDate) / 86400 / 1000) //获取相差的天数，可以为负数
    let nowday = new Date(date).getDay() //获取当前时间是星期几，0-6
    if (nowday == 0) {
      //如果为0的话，把周日赋值为7   1-7分别对应周一到周日
      nowday = 7
    }
    const hour = timeTo(value, 'hh')
    let hourText = ''
    if (hour < 12) hourText = ' 上午'
    else hourText = ' 下午'
    let timeText = hourText + timeTo(value, 'hh:mm:ss')

    if (day == 0) return '今天 ' + timeText
    //今天
    else if (day == 1) return '昨天' + timeText
    //昨天
    else if (day == 2) return '前天' + timeText
    //前天
    else if (day == -1) return '明天' + timeText
    //明天
    else if (day == -2) return '后天' + timeText
    //后天
    else if (day > 2 && day < nowday) {
      //判断是否是当前周而不是上一周
      var dayNum = nowday - day
      return '周' + week(dayNum) + timeText
    } else if (day > 2 && day >= nowday && day < nowday + 7) {
      //判断是否是上一周
      var dayNum = 7 - Math.abs(nowday - day)
      return '上周' + week(dayNum) + timeText
    } else if (day >= nowday + 7) {
      //判断是不是超过上一周，显示正常时间格式
      return timeTo(value, fmt)
    } else if (Math.abs(day) <= 7 - nowday && day < 0) {
      //判断是否是当前周，不是下一周
      var dayNum = Math.abs(day) + nowday
      return '周' + week(dayNum) + timeText
    } else if (Math.abs(day) > 7 - nowday && Math.abs(day) < 7 - nowday + 7 && day < 0) {
      var dayNum = Math.abs(day) + nowday - 7 //判断是否是下一周
      return '下周' + week(dayNum) + timeText
    } else if (Math.abs(day) > 7 - nowday + 7 && day < 0) {
      //判断是否超过下一周，显示正常格式
      return timeTo(value, fmt)
    }
  }
}

/**
 * Parse the time to string     时间戳
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @description 格式化时间，获取到最新的时间的 多长时间
 * @param time 
 * @param option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @description 10位时间戳转换
 * @param time
 * @returns {string}
 */
export function tenBitTimestamp(time) {
  const date = new Date(time * 1000)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}

/**
 * @description 13位时间戳转换
 * @param time
 * @returns {string}
 */
export function thirteenBitTimestamp(time) {
  const date = new Date(time / 1)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '' + m : m
  let d = date.getDate()
  d = d < 10 ? '' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '年' + m + '月' + d + '日 ' + h + ':' + minute + ':' + second //组合
}
