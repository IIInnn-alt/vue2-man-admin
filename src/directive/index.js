/*
 * @Author: mn
 * @Date: 2022-08-22 15:34:49
 * @LastEditors: mn
 * @LastEditTime: 2022-12-20 17:53:41
 * @Description: 
 */

import hasPermi from './permission/hasPermi'
import drag from './dragDialog/drag'
// import clipboard from './module/clipboard'

const install = function(Vue) {
  Vue.directive('has', hasPermi)
  Vue.directive('drag', drag)
  // Vue.directive('clipboard', clipboard)
}

if (window.Vue) {
  window['hasPermi'] = hasPermi
  window['drag'] = drag
  Vue.use(install); // eslint-disable-line
}

export default install
