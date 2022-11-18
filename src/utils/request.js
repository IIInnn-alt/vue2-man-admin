import axios from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { tansParams, throttle } from '@/utils'
import { getToken } from '@/utils/auth'
//创建axios,赋给变量server

const BASEURL = process.env.VUE_APP_BASE_API //-->vue.config.js,解决跨域问题
const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000 //超时时间
})

//  公共提示
const tipError = throttle(msg => {
  Message({
    message: msg,
    type: 'error'
  })
}, 3000)

const overtimeError = throttle(() => {
  MessageBox.confirm('系统超时，请重新登录', '确认退出', {
    confirmButtonText: '重新登录',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
    .catch(() => {})
}, 6000)

// 添加请求拦截器，请求前拦截
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = 'bearer ' + getToken()
    // get请求特殊字段做转义
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    // 登录接口单独处理-->权限认证
    if (config.url.includes('/login') || config.url.includes('/getCheckCode')) {
      config.auth = {
        username: 'client',
        password: '123456'
      }
      //'Basic ' + base64encode('client:123456')
    } else {
      config.headers.Authorization = token // 赋值最新的token
    }
    // if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
    //   config.data = qs.stringify(config.data)
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 续期功能  see https://www.cnblogs.com/haoxianrui/p/14022632.html
let refreshing = false, // 正在刷新标识，避免重复刷新
  waitQueue = [] // 请求等待队列
// 添加响应拦截器,请求接口后的拦截，对接口请求的响应 统一管理
service.interceptors.response.use(
  res => {
    // 获取错误信息
    if (res.status == 200) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    // 如果 router.history.path存在且不等于login,只提示框。
    if (
      error.response &&
      error.response.status == 401 &&
      router.history.current.path &&
      router.history.current.path !== '/login'
    ) {
      //access_token过期 使用refresh_token刷新换取access_token
      const config = error.response.config
      if (refreshing == false) {
        refreshing = true
        const refreshToken = getToken(2)
        return store
          .dispatch('refreshToken', refreshToken)
          .then(token => {
            config.headers['Authorization'] = 'Bearer ' + token
            config.baseURL = BASEURL // 请求重试时，url已包含baseURL
            waitQueue.forEach(callback => callback(token)) // 已刷新token，所有队列中的请求重试
            waitQueue = []
            return service(config)
          })
          .catch(() => {
            // refresh_token也过期，直接跳转登录页面重新登录
            overtimeError()
          })
          .finally(() => {
            refreshing = false
          })
      } else {
        // 正在刷新token，返回未执行resolve的Promise,刷新token执行回调
        return new Promise(resolve => {
          waitQueue.push(token => {
            config.headers['Authorization'] = 'Bearer ' + token
            config.baseURL = BASEURL // 请求重试时，url已包含baseURL
            resolve(service(config))
          })
        })
      }
    } else if (error.response && error.response.status == 400 && error.response.data.code == 'A0232') {
      overtimeError()
    } else {
      httpErrorStatusHandle(error)
    }
    return Promise.reject(error)
  }
)

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error) {
  let message = ''
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = '接口重定向了！'
        break
      case 400:
        message = '参数不正确！'
        break
      case 403:
        message = '您没有权限操作！'
        break
      case 404:
        message = `请求地址出错: ${error.response.config.url}`
        break // 在正确域名下
      case 408:
        message = '请求超时！'
        break
      case 409:
        message = '系统已存在相同数据！'
        break
      case 500:
        message = '服务器内部错误！'
        break
      case 501:
        message = '服务未实现！'
        break
      case 502:
        message = '网关错误！'
        break
      case 503:
        message = '服务不可用！'
        break
      case 504:
        message = '服务暂时无法访问，请稍后再试！'
        break
      case 505:
        message = 'HTTP版本不受支持!'
        break
      default:
        message = '异常问题，请联系管理员！'
        break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！'
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  tipError(message)
}
/**
 * @description: 通用axios请求
 * @param {Object} obj {method,url,params} 请求参数
 */

export function HTTP(obj) {
  return new Promise((resolve, reject) => {
    service
      .request({
        method: obj.method,
        url: obj.url,
        data: obj.params
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * @description GET 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_GET(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res && res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 在POST请求中的 Content-Type 常见的有以下3种形式：
    Content-Type: application/json  正常传值 data:patams
    Content-Type: application/x-www-form-urlencoded   需要序列化处理  data:qs.stringify(params) 
                                                      transformRequest: [
                                                       (data) => {
                                                        return qs.stringify(data)
                                                        }
                                                      ],
    Content-Type: multipart/form-data

 */

/**
 * @description POST 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_POST(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: params
    })
      .then(
        res => {
          resolve(res && res.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description PUT 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_PUT(url, params) {
  // params = qs.stringify(params)
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then(res => {
        resolve(res && res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description DELETE 请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
export function HTTP_DELETE(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        params: params
      })
      .then(res => {
        resolve(res && res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// data :请求参数
export function HTTP_DELETE1(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, {
        data: params
      })
      .then(res => {
        resolve(res && res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description 图片、文件 单上传
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_FILE(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: params
    })
      .then(
        res => {
          resolve(res && res.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description 文件导入,且后续需要下载
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_FILE_DOWN(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url: url,
      data: params,
      responseType: 'blob' //这里根据项目需求 文件导入后，需要下载后续的exlce
    })
      .then(
        res => {
          const resData = res.data
          if (resData.type === 'application/json') {
            // 说明是普通对象数据，读取信息
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
              const jsonData = JSON.parse(fileReader.result)
              // 后台信息
              resolve(jsonData)
            }
            fileReader.readAsText(resData)
          } else {
            resolve(resData)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * @description 文件导出
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
export function HTTP_EXPORT(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: 'get', //根据接口实际情况
      url: url,
      params: params,
      responseType: 'blob'
    })
      .then(
        res => {
          const resData = res.data
          if (resData.type === 'application/json') {
            // 说明是普通对象数据，读取信息
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
              const jsonData = JSON.parse(fileReader.result)
              // 后台信息
              resolve(jsonData)
            }
            fileReader.readAsText(resData)
          } else {
            resolve(resData)
          }
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}
