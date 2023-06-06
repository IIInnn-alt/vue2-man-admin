/*
 * @Author: mn
 * @Date: 2022-11-04 13:13:32
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 16:04:50
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
import PreviewCode from './PreviewCode'
import RemoteSelect from './RemoteSelect'

// 全局组件挂载
Vue.component('MCard', Card)
Vue.component('MTable', Table)
Vue.component('MDialog', Dialog)
Vue.component('SvgIcon', SvgIcon)
Vue.component('MSelect', Select)
Vue.component('TitleContainer', TitleContainer)
Vue.component('PreviewCode', PreviewCode)
Vue.component('RemoteSelect', RemoteSelect)
