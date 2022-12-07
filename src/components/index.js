/*
 * @Author: mn
 * @Date: 2022-11-04 13:13:32
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 11:28:44
 * @Description:  全局注册组件
 */
import Vue from 'vue'

// 组件
import Card from './Card' //卡片
import Table from './Table'
import TitleContainer from './TitleContainer'
import Dialog from './Dialog'
import Select from './Select'
import SvgIcon from './SvgIcon'

// 全局组件挂载
Vue.component('MCard', Card)
Vue.component('MTable', Table)
Vue.component('MDialog', Dialog)
Vue.component('SvgIcon', SvgIcon)
Vue.component('MSelect', Select)
Vue.component('TitleContainer', TitleContainer)
