/*
 * @Author: mn
 * @Date: 2022-05-23 14:02:51
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 15:01:00
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
import directive from './directive' // directive
import plugins from './plugins' // plugins
import './assets/icons' // icon svg-icon
import './permission' // permission control

// components 管理
import './components' //全局注册的组件
// api管理
import api from '@/api'

// 全局方法挂载
import './utils/globalUtils'
Vue.prototype.$api = api // api

// install 和 use 使用
Vue.use(directive)
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
console.log(module,'module');

// 导入图片预加载方法以及图片列表
import { imgsPreloader } from '@/config/imgPreloader.js'
import imgPreloaderList from '@/config/imgPreloaderList.js'

let custom_render = async () => {
  await imgsPreloader(imgPreloaderList)
  //关闭加载弹框 loading-content为 public/index.html中的 className
  document.querySelector('.loading-content').style.display = 'none'
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

custom_render()
