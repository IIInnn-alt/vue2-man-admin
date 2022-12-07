/*
 * @Author: mn
 * @Date: 2022-11-30 11:26:31
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 11:28:15
 * @Description:
 */
const req = require.context('../../../assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const svgIcons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default svgIcons
