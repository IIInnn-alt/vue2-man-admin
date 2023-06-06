/*
 * @Author: mn
 * @Date: 2023-02-23 09:18:13
 * @LastEditors: mn
 * @LastEditTime: 2023-02-23 09:20:03
 * @Description: 需要预加载的图片
 *  用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
 */
export default [
  require('@/assets/images/login_banner.png'),
  require('@/assets/images/login_bg.jpg'),
]