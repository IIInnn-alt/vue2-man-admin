/*
 * @Author: mn
 * @Date: 2023-01-29 10:57:54
 * @LastEditors: mn
 * @LastEditTime: 2023-06-13 17:25:57
 * @Description:
 */
import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import elEn from 'element-ui/lib/locale/lang/en'
import elZh from 'element-ui/lib/locale/lang/zh-CN'
import en from './lang/en.json'
import zh from './lang/zh.json'

Vue.use(VueI18n)

const defaultLang = store.getters.language
const messages = {
  en: {
    ...en,
    ...elEn
  },
  zh: {
    ...zh,
    ...elZh
  }
}

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

document.querySelector('html').setAttribute('lang', defaultLang)

ElementLocale.i18n((key, value) => i18n.t(key, value))

export function i18nRender(key) {
  return i18n.t(`${key}`)
}

export default i18n
