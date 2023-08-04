/*
 * @Author: mn
 * @Date: 2022-10-28 13:45:30
 * @LastEditors: mn
 * @LastEditTime: 2023-06-13 13:17:10
 * @Description:
 */

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */
import Layout from '@/layout'
export default [
  {
    path: '/compons',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '组件封装',
      icon: 'menuCom'
    },
    roles: ['admin'],
    children: [
      {
        path: 'table',
        component: () => import('@/views/compons/table/index.vue'),
        name: 'table',
        meta: { title: '自定义Table' }
      },
      {
        path: 'select',
        component: () => import('@/views/compons/select/index.vue'),
        name: 'mselect',
        meta: { title: '自定义Select' }
      },
      {
        path: 'icons',
        component: () => import('@/views/compons/icons/index.vue'),
        name: 'icons',
        meta: { title: 'icons图标' }
      }
    ]
  },
  {
    path: '/document',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '笔记文档',
      icon: 'menuDocment'
    },
    roles: ['admin'],
    children: [
      {
        path: 'npm',
        component: () => import('@/views/document/node/index.vue'),
        name: 'node',
        meta: { title: 'node软件包管理' }
      },
      {
        path: 'git',
        component: () => import('@/views/document/git/index.vue'),
        name: 'git',
        meta: { title: 'git' }
      },
      {
        path: 'class',
        component: () => import('@/views/document/class/index.vue'),
        name: 'class',
        meta: { title: 'class类' }
      },
      {
        path: 'vueI18n',
        component: () => import('@/views/document/i18n/index.vue'),
        name: 'i18n',
        meta: { title: '国际化i18n' }
      }
    ]
  }
]
