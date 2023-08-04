/*
 * @Author: mn
 * @Date: 2023-01-29 13:15:58
 * @LastEditors: mn
 * @LastEditTime: 2023-02-03 16:11:52
 * @Description:
 */

import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { i18nRender } from '@/i18n'
export function translateTitle(title) {
  if (i18nRender(`${title}`)) return i18nRender(`${title}`)
  return title
}

export function isEngLish() {
  return store.getters.language == 'en' ? true : false
}

export function getloadTableMsg() {
  let currentLanguage = store.getters.language
  let currentRouteMeta = router.currentRoute.meta
  let msg = translateTitle('数据')
  if (currentRouteMeta && currentRouteMeta.title && currentRouteMeta.titleEn) {
    msg = currentLanguage == 'en' ? currentRouteMeta.titleEn : currentRouteMeta.title
  } else {
    msg = translateTitle('数据')
  }
  return Message({
    message: msg + translateTitle('获取失败'),
    type: 'error'
  })
}
