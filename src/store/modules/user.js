/*
 * @Author: mn
 * @Date: 2022-06-13 14:17:32
 * @LastEditors: mn
 * @LastEditTime: 2022-11-03 14:13:46
 * @Description:
 */
import { login, logout, getInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
const state = {
  token: getToken(),
  refresh_token: getToken(2),
  userName: '',
  userInfo: {},
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESHTOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(res => {
          if (res.code == 200) {
            setToken(res.data.access_token)
            setToken(res.data.refresh_token, 2)
            commit('SET_TOKEN', res.data.access_token)
            commit('SET_REFRESHTOKEN', res.data.refresh_token)
          }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // // get user info
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.code == 200) {
            const { data } = res
            commit('SET_USERINFO', data)
            commit('SET_USERNAME', data.realname)
            commit('SET_ROLES', data.roles)
            resolve(data)
          } else {
            reject(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 刷新token，回调覆盖本地token
  refreshToken({ commit }, refreshToken) {
    commit('SET_TOKEN', '')
    return new Promise((resolve, reject) => {
      const refreshUser = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
      login(refreshUser)
        .then(response => {
          const { access_token, refresh_token } = response
          commit('SET_TOKEN', access_token)
          commit('SET_REFRESHTOKEN', refresh_token)
          setToken(access_token)
          setToken(refresh_token, 2)
          resolve(access_token)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // // user LogOut
  LogOut({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_REFRESHTOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeToken(2)
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_REFRESHTOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeToken(2)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
