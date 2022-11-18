/*
 * @Author: mn
 * @Date: 2022-05-23 14:02:51
 * @LastEditors: mn
 * @LastEditTime: 2022-11-04 10:41:42
 * @Description: router
 */
import Vue from 'vue'
import Router from 'vue-router'
// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
import dynamic_routes from './dynamicRoutes'
// 基础路由
export const constantRoutes = [
  // 基础路由
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'index',
    meta: {
      title: '首页',
      icon: 'menuHome'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页', icon: 'menuHome', affix: true }
      }
    ]
  }
]
// 动态路由
export const dynamicRoutes = dynamic_routes
const createRouter = () =>
  new Router({
    mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history', // history 模式 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
