<template>
  <m-card>
    <div slot="header">npm相关</div>
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
            <td>npm -v</td>
            <td>查看 npm 版本。</td>
          </tr>
          <tr>
            <td>npm init</td>
            <td>初始化后会出现一个 package.json 配置文件。可以在后面加上 -y ，快速跳过问答式界面。</td>
          </tr>
          <tr>
            <td>npm install</td>
            <td>根据项目中的 package.json 文件自动下载项目所需的全部依赖。</td>
          </tr>
          <tr>
            <td>npm install 包名 --save-dev(npm install 包名 -D)</td>
            <td>安装的包只用于开发环境，不用于生产环境，会出现在 package.json 文件中的 devDependencies 属性中。</td>
          </tr>
          <tr>
            <td>npm install 包名 --save(npm install 包名 -S)</td>
            <td>安装的包需要发布到生产环境的，会出现在 package.json 文件中的 dependencies 属性中。</td>
          </tr>
          <tr>
            <td>npm list</td>
            <td>查看当前目录下已安装的 node 包。</td>
          </tr>
          <tr>
            <td>npm list -g</td>
            <td>查看全局已经安装过的 node 包。</td>
          </tr>
          <tr>
            <td>npm --help</td>
            <td>查看 npm 帮助命令。</td>
          </tr>
          <tr>
            <td>npm update 包名</td>
            <td>更新指定包。</td>
          </tr>
          <tr>
            <td>npm uninstall 包名</td>
            <td>卸载指定包。</td>
          </tr>
          <tr>
            <td>npm config list</td>
            <td>查看配置信息。</td>
          </tr>
          <tr>
            <td>npm 指定命令 --help</td>
            <td>查看指定命令的帮助。</td>
          </tr>
          <tr>
            <td>npm info 指定包名</td>
            <td>查看远程 npm 上指定包的所有版本信息。</td>
          </tr>
          <tr>
            <td>
              npm config set registry
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
          <tr>
            <td>npm root</td>
            <td>查看当前包的安装路径。</td>
          </tr>
          <tr>
            <td>npm root -g</td>
            <td>查看全局的包的安装路径。</td>
          </tr>
          <tr>
            <td>npm ls 包名</td>
            <td>查看本地安装的指定包及版本信息，没有显示 empty。</td>
          </tr>
          <tr>
            <td>npm ls 包名 -g</td>
            <td>查看全局安装的指定包及版本信息，没有显示 empty。</td>
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
