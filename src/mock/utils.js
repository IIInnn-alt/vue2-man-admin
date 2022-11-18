/*
 * @Author: mn
 * @Date: 2022-07-12 14:42:32
 * @LastEditors: mn
 * @LastEditTime: 2022-10-28 13:02:05
 * @Description:
 */
import { getToken } from '@/utils/auth' // get token from cookie
import Base64 from 'base-64';
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

export const validToken = function (value) {
  if (value !== 'bearer ' + getToken()) {
    return {
      code: 401, //这个根据 request.js 请求响应返回来  配置的
      message: 'token失效'
    }
  }
}
