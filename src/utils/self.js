/**
 * 动态加载高德地图
 *
 * @export
 * @param {*} key 高德地图key
 * @param {*} plugins 高德地图插件
 * @param {string} [v='1.4.14'] 高德地图版本
 * @returns
 */

export function loadMap(key = '434451d7938836f1a36d6791d7303b13', plugins, v = '2.0') {
  return new Promise(function (resolve, reject) {
    if (typeof AMap !== 'undefined') {
      // eslint-disable-next-line no-undef
      resolve(AMap)
      return true
    }
    window.onCallback = function () {
      // eslint-disable-next-line no-undef
      let script1 = document.createElement('script')
      script1.type = 'text/javascript'
      script1.src = 'https://webapi.amap.com/ui/1.1/main.js'
      document.head.appendChild(script1)
      resolve(AMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://webapi.amap.com/maps?v=${v}&key=${key}&plugin=${plugins}&callback=onCallback`
    script.onerror = reject
    document.head.appendChild(script)
  })
}

/**
 * @description:通用返回格式的 数据请求
 * @param {*} apiName  api.js中定义的 接口名称
 * @param {*} params  查询参数
 */
export async function getApiData({ apiName, params = {} }) {
  let paramsObj = Object.assign({ page: 1, limit: 999 }, params)
  let res = await this.$api[apiName](paramsObj)
  try {
    if (res.code == 200) {
      return res.data.records || res.data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

/**
 * @description: table表格中 格式化
 * @param {*} (row, column, value, index) 为 formatter参数
 */
import { isEmpty } from './validate'
export function emptyFmt(row, column, value, index) {
  return isEmpty(value) ? '-' : value
}

/**
 * @description: 基于16px的基础上,适应不同的 px转换
 * @param {*} val 为 number 类型 单位px
 */
export function autoPx(val) {
  let defaultSize = 16
  let currentSize = parseFloat(document.documentElement.style.fontSize) || 16
  return (parseFloat(val) / defaultSize) * currentSize + 'px'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description: 描述
 */
export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}

//  npm install -S file-saver xlsx
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// // 导出excel
// function exportExcel(id, excelName) { //方法接收两个参数：table表格的id, 导出的excel命名
//   // 生成Excel工作簿对象
//   var xlsxParam = {
//     raw: true
//   } // 只导出不解析
//   var wb = XLSX.utils.table_to_book(document.querySelector('#' + id), xlsxParam)
//   // 获取二进制字符串作为输出
//   var wbout = XLSX.write(wb, {
//     bookType: 'xlsx',
//     book: true,
//     type: 'array'
//   })
//   try {
//     FileSaver.saveAs(
//       // Blob: 对象表示一个不可变 原始数据的类文件对象,不一定是JS原生格式的数据。
//       // File: 基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。
//       new Blob([wbout], {
//         type: 'appliction/octet-stream'
//       }),
//       // 设置导出的文件名称
//       `${excelName}` + '.xlsx'
//     )
//   } catch (e) {
//     if (typeof console !== 'undefined') console.log(e, wbout)
//   }
//   // 返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成。
//   return wbout
// }
// export default exportExcel

/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4)
  if (date) random = random + Date.now()
  return random
}
