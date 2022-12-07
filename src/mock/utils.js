/*
 * @Author: mn
 * @Date: 2022-07-12 14:42:32
 * @LastEditors: mn
 * @LastEditTime: 2022-11-22 13:42:55
 * @Description:
 */
import { getToken } from '@/utils/auth' // get token from cookie
import Base64 from 'base-64'
// 解析get请求的参数
export const param2Obj = url => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  )
}

// 校验auth
export const validAuth = function (value) {
  if (value !== 'Basic ' + Base64.encode('client:123456')) {
    return {
      code: 401, //这个根据 request.js 请求响应返回来  配置的
      message: 'auth权限未认证'
    }
  }
}
//  校验token
export const validToken = function (value) {
  if (value !== 'bearer ' + getToken()) {
    return {
      code: 401, //这个根据 request.js 请求响应返回来  配置的
      message: 'token失效'
    }
  }
}

// common
export const response = (config, dataSource = []) => {
  validToken(config.headers.Authorization)
  let page = Number(config.query.page) || 1
  let limit = Number(config.query.limit) || 10
  return {
    code: 200, //这个根据 request.js 请求响应返回来  配置的
    data: {
      page,
      limit,
      total: dataSource.length,
      records: dataSource.slice((page - 1) * limit, (page - 1) * limit + limit)
    }
  }
}
