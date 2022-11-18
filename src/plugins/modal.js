/*
 * @Author: mn
 * @Date: 2022-08-15 09:06:06
 * @LastEditors: mn
 * @LastEditTime: 2022-08-22 16:59:14
 * @Description:
 */
import { Message, MessageBox, Notification, Loading } from 'element-ui'

let loadingInstance

export default {
  // 消息提示
  msg(message, duration) {
    Message.info({ message, duration })
  },
  // 错误消息
  msgError(message, duration) {
    Message.error({ message, duration })
  },
  // 成功消息
  msgSuccess(message, duration) {
    Message.success({ message, duration })
  },
  // 警告消息
  msgWarning(message, duration) {
    Message.warning({ message, duration })
  },
  // 弹出提示
  alert(content) {
    MessageBox.alert(content, '系统提示')
  },
  // 错误提示
  alertError(content) {
    MessageBox.alert(content, '系统提示', { type: 'error' })
  },
  // 成功提示
  alertSuccess(content) {
    MessageBox.alert(content, '系统提示', { type: 'success' })
  },
  // 警告提示
  alertWarning(content) {
    MessageBox.alert(content, '系统提示', { type: 'warning' })
  },
  // 通知提示
  notify(content) {
    Notification.info(content)
  },
  // 错误通知
  notifyError(content) {
    Notification.error(content)
  },
  // 成功通知
  notifySuccess(content) {
    Notification.success(content)
  },
  // 警告通知
  notifyWarning(content) {
    Notification.warning(content)
  },
  // 确认窗体
  confirm(content = '此操作将永久删除该信息, 是否继续?') {
    return MessageBox.confirm(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  },
  // 提交内容
  prompt(content) {
    return MessageBox.prompt(content, '系统提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
  },
  // 打开遮罩层
  loading(content) {
    loadingInstance = Loading.service({
      lock: true,
      text: content,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close()
  }
}
