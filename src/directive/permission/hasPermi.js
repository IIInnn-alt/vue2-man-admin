/*
 * @Author: mn
 * @Date: 2022-08-22 15:34:49
 * @LastEditors: mn
 * @LastEditTime: 2023-01-30 15:46:42
 * @Description: 
 */
import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const menuId = localStorage.getItem('tav_to_menu_id') //当前访问菜单ID
    if (menuId == undefined || menuId == null) {
      return false
    }

    const permissions = store.getters && store.getters.permission_addButtons
    const permissionFlag = value
    const hasPermissions =
      permissions[menuId] &&
      permissions[menuId].length &&
      permissions[menuId].some(permission => {
        return permissionFlag.includes(permission.naviUrl)
      })
    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
