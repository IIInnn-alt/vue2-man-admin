/*
 * @Author: mn
 * @Date: 2022-05-23 14:02:51
 * @LastEditors: mn
 * @LastEditTime: 2022-11-04 13:31:30
 * @Description:
 */
import Vue from 'vue'

// 全局引入element-ui、css样式
import './styles/normalize.scss' // CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins' // plugins
import './assets/icons' // icon svg-icon
import './permission' // permission control

import './components' //注册组件
// api管理
import api from '@/api'

// 全局方法挂载
Vue.prototype.$api = api // api

// install 和 use 使用
Vue.use(plugins)

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  //开发模式
  const { mockXHR } = require('./mock')
  mockXHR()
}
console.log(process.env, 'process.env项目环境文件')
console.log(BUILD_DATE, 'BUILD_DATE')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
