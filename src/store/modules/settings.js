/*
 * @Author: mn
 * @Date: 2022-08-08 18:39:47
 * @LastEditors: mn
 * @LastEditTime: 2023-06-13 13:16:23
 * @Description:
 */
import Cookies from 'js-cookie'
import { language } from '@/config/settings'
const state = {
  // Cookies.get('man_localLang') ||
  language: language
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGELANGUAGE(state, language) {
    state.language = language
    // Cookies.set('man_localLang', language)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeLanguage: ({ commit }, language) => {
    commit('CHANGELANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
