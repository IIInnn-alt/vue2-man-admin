/*
 * @Author: mn
 * @Date: 2022-11-22 11:33:28
 * @LastEditors: mn
 * @LastEditTime: 2022-11-29 15:38:02
 * @Description: 全局方法挂载
 */
import Vue from 'vue'

// 引入
import { emptyFmt, autoPx, getApiData } from './self'
import { validRules } from './validate'

// 挂载
window.emptyFmt = Vue.prototype.emptyFmt = emptyFmt // emptyFmt
window.autoPx = Vue.prototype.autoPx = autoPx // autoPx
Vue.prototype.validRules = validRules // validRules
Vue.prototype.getApiData = getApiData // autoPx
