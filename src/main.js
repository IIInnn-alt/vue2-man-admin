/*
 * @Author: mn
 * @Date: 2022-05-23 14:02:51
 * @LastEditors: mn
 * @LastEditTime: 2022-07-08 16:47:40
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

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false

console.log(process.env, 'process.env项目环境文件')
console.log(BUILD_DATE, 'BUILD_DATE')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
