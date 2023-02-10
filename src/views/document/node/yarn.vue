<!--
 * @Author: mn
 * @Date: 2022-12-08 10:04:31
 * @LastEditors: mn
 * @LastEditTime: 2022-12-09 09:55:44
 * @Description: 
-->
<template>
  <m-card>
    <div slot="header">yarn相关</div>
    <div>
      <table class="c-table" border="1" cellspacing="0">
        <thead>
          <tr>
            <th><strong>命令</strong></th>
            <th><strong>作用</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Yarn -v</td>
            <td>查看 Yarn 版本。</td>
          </tr>
          <tr>
            <td>yarn init</td>
            <td>初始化后会出现一个 package.json 配置文件。可以在后面加上 -y ，快速跳过问答式界面。</td>
          </tr>
          <tr>
            <td>yarn add</td>
            <td>通过 yarn add 添加依赖会更新 package.json 以及 yarn.lock 文件</td>
          </tr>
          <tr>
            <td>yarn add 包名 -dev(yarn add 包名 -D)</td>
            <td>安装的包只用于开发环境，不用于生产环境，会出现在 package.json 文件中的 devDependencies 属性中。</td>
          </tr>
          <tr>
            <td>yarn add 包名 --save(yarn add 包名 默认)</td>
            <td>安装的包需要发布到生产环境的，会出现在 package.json 文件中的 dependencies 属性中。</td>
          </tr>
          <tr>
            <td>yarn global add</td>
            <td>全局安装依赖。</td>
          </tr>
          <tr>
            <td>yarn list</td>
            <td>查看当前目录下已安装的 node 包。</td>
          </tr>
          <tr>
            <td>sudo yarn global list</td>
            <td>查看全局已经安装过的 node 包。</td>
          </tr>
          <tr>
            <td>yarn upgrade 包名</td>
            <td>更新指定包。</td>
          </tr>
          <tr>
            <td>yarn remove 包名</td>
            <td>卸载或移除指定包。</td>
          </tr>
          <tr>
            <td>yarn coinfig list</td>
            <td>查看配置信息。</td>
          </tr>
          <tr>
            <td>sudo yarn cache [list、dir、clean]</td>
            <td>针对缓存 列出、返回位置、清除</td>
          </tr>
          <tr>
            <td>yarn info 指定包名</td>
            <td>用来查看某个模块的最新版本信息。</td>
          </tr>
          <tr>
            <td>
              yarn config set registry
              <a
                href="https://link.juejin.cn?target=https%3A%2F%2Fregistry.npm.taobao.org"
                target="_blank"
                rel="nofollow noopener noreferrer"
                title="https://registry.npm.taobao.org"
                ref="nofollow noopener noreferrer"
              >
                registry.npm.taobao.org
              </a>
            </td>
            <td>修改包下载源，这里修改为了淘宝镜像。</td>
          </tr>
        </tbody>
      </table>
    </div>
  </m-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.c-table {
  th,
  td {
    border: 1px solid $theme;
    padding: 5px 10px;
  }
}
</style>
