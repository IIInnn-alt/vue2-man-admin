/*
 * @Author: mn
 * @Date: 2022-06-13 14:17:32
 * @LastEditors: mn
 * @LastEditTime: 2022-07-19 10:54:30
 * @Description:
 */
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  refresh_token: state => state.user.refresh_token,
  userName: state => state.user.userName,
  userInfo: state => state.user.userInfo,
  currentPatientInfo: state => state.user.currentPatientInfo,
  currentDoctorInfo: state => state.user.currentDoctorInfo,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
