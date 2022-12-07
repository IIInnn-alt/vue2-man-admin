/*
 * @Author: mn
 * @Date: 2022-11-30 13:07:07
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 14:37:21
 * @Description:
 */
// import Vue from 'vue'
//  clipboard.js   复制功能
import Clipboard from 'clipboard'
import { Message } from 'element-ui'

export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    Message({
      message: '复制成功' + text,
      type: 'success',
      duration: 1500
    })
    // 释放内存
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Message({
      message: '该浏览器不支持自动复制,请手动复制 ',
      type: 'error'
    })
    // 释放内存
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
