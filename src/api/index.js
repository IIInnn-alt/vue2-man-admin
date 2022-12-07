/*
 * @Author: mn
 * @Date: 2022-07-13 16:18:05
 * @LastEditors: mn
 * @LastEditTime: 2022-11-29 10:53:55
 * @Description:api管理
 */
import {
  HTTP_GET,
  HTTP_POST,
  HTTP_PUT,
  HTTP_DELETE,
  HTTP_DELETE1,
  HTTP_FILE,
  HTTP_FILE_DOWN,
  HTTP_EXPORT
} from '@/utils/request.js'
import qs from 'qs'
export default {
  // mock.js 拦截
  getCheckCode(params) { return HTTP_GET('/getCheckCode', params) },   //获取验证码
  // compons -table
  getTableData(params) { return HTTP_GET('/mock/getTableData', params) },  //获取数据
  getRoleData(params) { return HTTP_GET('/mock/getRoleData', params) },  //获取角色列表数据
}

/**
 * 登 录
 * @param {*} data 参数
 */
 export function login(params) {
  // return HTTP_POST('/login', qs.stringify(params))
  return HTTP_POST('/login', params)
}
/**
 * 退出
 * @param {*} data 参数
 */
export function logout() {
  return HTTP_DELETE('/logout')
}
/**
 * 获取用户详细信息
 * @param {*} data 参数
 */
export function getInfo(params) {
  return HTTP_GET('/userinfo')
}
