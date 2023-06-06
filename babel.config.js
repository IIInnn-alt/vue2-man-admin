/*
 * @Author: mn
 * @Date: 2022-05-23 14:02:51
 * @LastEditors: mn
 * @LastEditTime: 2022-12-12 14:18:37
 * @Description:  npm install prismjs -S
                  npm install babel-plugin-prismjs -D
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'markup'],
        plugins: ['line-numbers'], //配置显示行号插件
        theme: 'solarizedlight', //主体名称
        css: true
      }
    ]
  ]
}
