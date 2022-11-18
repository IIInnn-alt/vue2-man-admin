/*
 * @Author: mn
 * @Date: 2022-08-09 15:57:32
 * @LastEditors: mn
 * @LastEditTime: 2022-08-09 15:57:44
 * @Description: 
 */
import tab from './tab'
import modal from './modal'

export default {
  install(Vue) { 
    // 页签操作
    Vue.prototype.$tab = tab
    // 模态框对象
    Vue.prototype.$modal = modal
  }
}
