/*
 * @Author: mn
 * @Date: 2022-08-09 15:54:10
 * @LastEditors: mn
 * @LastEditTime: 2022-08-09 15:54:15
 * @Description: 
 */
// 加载插件 plugins vue中调用 this.$+文件名
const requirePlugin = require.context('../plugins', true, /\.js$/)
const re = /\.\/(.*)\.js/
requirePlugin.keys().forEach(fileName => {
  Vue.prototype['$' + fileName.match(re)[1]] = requirePlugin(fileName).default
})

// 加载组件
const requireComponent = require.context('../components', true, /\.vue$/)
const rev = /\.\/(.*)\/index.vue/
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.match(rev)[1]
  Vue.component(componentName, componentConfig.default || componentConfig)
})