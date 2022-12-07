/*
 * @Author: mn
 * @Date: 2022-09-21 15:03:38
 * @LastEditors: mn
 * @LastEditTime: 2022-09-21 15:03:57
 * @Description: 
 */

const req = require.context('../../assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map(i => {
  return i.match(re)[1]
})

export default icons
