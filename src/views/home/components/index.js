/*
 * @Author: mn
 * @Date: 2022-11-07 17:14:25
 * @LastEditors: mn
 * @LastEditTime: 2022-11-07 17:24:23
 * @Description:
 */
export const coms = {}
// 加载组件
const requireComponent = require.context('../components', true, /\.vue$/)
const rev = /\.\/(.*)\.vue/
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.match(rev)[1]
  coms[componentName] = componentConfig.default || componentConfig
})
