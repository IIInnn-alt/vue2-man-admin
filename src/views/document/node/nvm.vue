<!--
 * @Author: mn
 * @Date: 2022-12-09 11:06:33
 * @LastEditors: mn
 * @LastEditTime: 2022-12-09 13:28:25
 * @Description: 
-->
<template>
  <div>
    <m-card>
      <div slot="header">
        nvm管理node
        <el-link type="success" href="https://juejin.cn/post/7120267871950733320#heading-12" target="_blank">
          (链接)
        </el-link>
      </div>
      <div>
        <h3>下载nvm</h3>
        <span>
          进入官网下载链接:
          <el-link type="success" href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">
            https://github.com/coreybutler/nvm-windows/releases
          </el-link>
          ,windows系统下载nvm-setup.zip安装包
        </span>
        <hr />
        <table class="c-table" border="1" cellspacing="0">
          <thead>
            <tr>
              <th><strong>命令</strong></th>
              <th><strong>作用</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>nvm list</span>
                <br />
                <span>nvm list available</span>
              </td>
              <td>
                <span>查看已经安装的版本</span>
                <br />
                <span>查看网络可以安装的版本</span>
              </td>
            </tr>
            <tr>
              <td>nvm install</td>
              <td>安装最新版本nvm</td>
            </tr>
            <tr>
              <td>nvm use &lt;version&gt;</td>
              <td>切换使用指定的版本node</td>
            </tr>
            <tr>
              <td>nvm current</td>
              <td>显示当前版本</td>
            </tr>
            <tr>
              <td>nvm alias &lt;name&gt; &lt;version&gt;</td>
              <td>给不同的版本号添加别名</td>
            </tr>
            <tr>
              <td>nvm unalias &lt;name&gt;</td>
              <td>删除已定义的别名</td>
            </tr>
            <tr>
              <td>nvm reinstall-packages &lt;version&gt;</td>
              <td>在当前版本node环境下,重新全局安装指定版本号的npm包</td>
            </tr>
            <tr>
              <td>nvm on</td>
              <td>打开nodejs控制</td>
            </tr>
            <tr>
              <td>nvm off</td>
              <td>off 关闭nodejs控制</td>
            </tr>
            <tr>
              <td>nvm proxy</td>
              <td>查看设置与代理</td>
            </tr>
            <tr>
              <td>
                <span>nvm node_mirror [url]</span>
                <br />
                <span>nvm npm_mirror [url]</span>
              </td>
              <td>
                <span>设置或者查看setting.txt中的node_mirror,如果不设置的默认是 https://nodejs.org/dist/</span>
                <br />
                <span>
                  设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/
                </span>
              </td>
            </tr>
            <tr>
              <td>nvm uninstall &lt; version &gt;</td>
              <td>卸载制定的版本</td>
            </tr>
            <tr>
              <td>nvm use [version] [arch]</td>
              <td>切换制定的node版本和位数</td>
            </tr>
            <tr>
              <td>nvm root [path]</td>
              <td>查看当前的版本</td>
            </tr>
          </tbody>
        </table>
      </div>
    </m-card>
    <m-card>
      <div slot="header">
        nrm 是一个npm注册表(仓库源)管理工具,一键切换cnpm,taobao,tencent等仓库源,帮助开发者快速安装依赖
        <el-link type="success" href="https://github.com/Pana/nrm" target="_blank">(链接)</el-link>
      </div>
      <div>
        <h3>安装</h3>
        <span>npm install -g nrm</span>
        <hr />
        <h3>查看可使用源</h3>
        <span>nrm ls</span>
        <hr />
        <h3>使用某个源</h3>
        <span>nrm use &lt;name&gt;</span>
      </div>
    </m-card>
  </div>
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
