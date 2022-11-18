/*
 * @Author: mn
 * @Date: 2022-06-13 15:19:03
 * @LastEditors: mn
 * @LastEditTime: 2022-11-03 10:13:28
 * @Description: token相关设置
 */
import Cookies from 'js-cookie'

const ACCESS_TOKEN = 'Man-Access-Token'
const REFRESH_TOKEN = 'Man-Refresh_Token'
// tokenType == 1  ACCESS_TOKEN  tokenType == 2 REFRESH_TOKEN

export function getToken(tokenType = 1) {
  return Cookies.get(tokenType == 2 ? REFRESH_TOKEN : ACCESS_TOKEN)
}

export function setToken(token, tokenType = 1) {
  return Cookies.set(tokenType == 2 ? REFRESH_TOKEN : ACCESS_TOKEN, token, { expires: 3 })
}

export function removeToken(tokenType = 1) {
  return Cookies.remove(tokenType == 2 ? REFRESH_TOKEN : ACCESS_TOKEN)
}
