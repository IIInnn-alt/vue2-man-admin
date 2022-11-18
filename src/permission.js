/*
 * @Author: mn
 * @Date: 2022-06-14 14:42:54
 * @LastEditors: mn
 * @LastEditTime: 2022-10-31 09:53:24
 * @Description:
 */
import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { resetRouter } from '@/router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  const hastoken = getToken()
  if (hastoken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 确定用户是否已通过getInfo获得其权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const dataInfo = await store.dispatch('user/GetInfo')
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/GenerateRoutes', dataInfo)
          
          // dynamically add accessible routes
          accessRoutes.forEach(r => {
            router.addRoute(r)
          })
          // router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          store
            .dispatch('user/LogOut')
            .then(() => {
              next({ path: '/login' })
            })
            .catch(() => {
              // logOut err下
              store.dispatch('user/FedLogOut').then(() => {
                next({ path: '/login' })
              })
            })
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      resetRouter()
      // next(`/login?redirect=${to.path}`)
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
