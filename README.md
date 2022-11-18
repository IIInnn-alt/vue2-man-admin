<!--
 * @Author: mn
 * @Date: 2022-05-23 14:03:09
 * @LastEditors: mn
 * @LastEditTime: 2022-10-26 16:05:01
 * @Description: 
-->
# vue2-man-admin

## Project setup

```bash
npm install
```

# 建议不要下载最新的nodejs版本,有的依赖并没有适配

# 检查node版本 = 14

node -v

# 若高版本node 可执行n 命令切换至 14版本

比如n 14.18.1

### Compiles and hot-reloads for development

# 若报 Cannot find module 'node-sass',去查看node.js版本对应的node-sass是否符合<https://github.com/sass/node-sass>

# 执行 npm config set sass_binary_site=<https://npm.taobao.org/mirrors/node-sass>

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题

npm install --registry=<https://registry.npm.taobao.org> 下载时去掉<>

# 友情提示

npm下载过中 报ERESOLVE unable to resolve dependency tree的错误, 因为 依赖项中存在无法解决的冲突，npm@7 现在尝试安装它们，而npm@6没有
使用 npm i --legacy-peer-deps 去解决,在启动服务

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
