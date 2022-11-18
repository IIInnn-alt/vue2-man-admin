/*
 * @Author: mn
 * @Date: 2022-06-13 14:17:32
 * @LastEditors: mn
 * @LastEditTime: 2022-10-31 15:02:40
 * @Description:
 */
import { constantRoutes, dynamicRoutes } from '@/router'
// import { arrObjSort, toTreeData } from '@/utils/self'
// import Layout from '@/layout/index'
// import lodash from 'lodash'
const state = {
  routes: [], //全部的路由组件信息
  addButtons: {}, // 按钮权限信息
  addRoutes: [] // 权限路由基础信息，即当前用户可以访问的菜单权限
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  },
  SET_ADDROUTES: (state, routes) => {
    state.addRoutes = routes
  },
  SET_ADDBUTTONS: (state, buttons) => {
    state.addButtons = buttons
  }
}

const actions = {
  // 生成路由
  GenerateRoutes({ commit, state }, userData) {
    return new Promise((resolve, reject) => {
      console.log(userData, 'userData')
      let valieMenu = getValidMenu(dynamicRoutes, userData.roles[0])
      commit('SET_ADDROUTES', valieMenu)
      commit('SET_ROUTES', valieMenu)
      resolve(valieMenu)
    })
  }
}

// 处理路由，转为组件对象
function menufilter(treeMenus, comMenus = []) {
  treeMenus.forEach(item => {
    let menuItem = {}
    menuItem.path = item.path == '#' ? '' : item.path
    let meta = {
      title: item.name,
      icon: item.icon,
      menuType: item.menuType,
      menuId: item.menuId
    }
    if (item.component == 'Layout') {
      menuItem.component = Layout
      menuItem.alwaysShow = true
      menuItem.meta = Object.assign(meta, {})
    } else {
      menuItem.meta = Object.assign(meta, {
        noCache: item.keepAlive == '1' // 0 开启   1 关闭 ，noCache为true 不会被 <keep-alive> 缓存(默认 false)
      })
      menuItem.name = item.component
      // 动态加载路径  menuItem.component代表着每个单页面的name（必填）,加载前赋值name
      menuItem.component = loadView(item.path)

      // 一级路由 ：item.parentId == -1
      if (item.parentId == -1 && item.component != 'Layout') {
        let temp_menu = {
          path: '',
          component: Layout,
          redirect: '/' + item.path,
          name: 'redirect' + item.name,
          meta: {
            title: item.name,
            icon: item.icon,
            menuType: item.menuType
          },
          children: [{ ...menuItem }]
        }
        menuItem = temp_menu
      }
    }
    if (item.children && item.children.length > 0) {
      menuItem.children = []
      menufilter(item.children, menuItem.children)
    }
    comMenus.push(menuItem)
  })
  return comMenus
}
function loadView(view) {
  // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)
}
// 根据角色获取menu
function getValidMenu(dataSource = [], role) {
  return dataSource.map(item => {
    if (item.roles.length && item.roles.includes(role)) {
      return item
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
