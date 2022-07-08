<!--
 * @Author: mn
 * @Date: 2022-06-02 17:29:53
 * @LastEditors: mn
 * @LastEditTime: 2022-07-08 15:11:59
 * @Description: 笔记
-->

# npm

-S, --save 安装包信息将加入到dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）

-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作业的）

正常使用npm install时，会下载dependencies和devDependencies中的模块，当使用npm install –production或者注明NODE_ENV变量值为production时，只会下载dependencies中的模块。

# vue.config.js

 插件 [script-ext-html-webpack-plugin]:<https://github.com/numical/script-ext-html-webpack-plugin> 是webpack插件html-webpack-plugin的扩展插件- 一个简化 HTML 文件的创建以提供 webpack 包的插件,
 原始html-webpack-plugin将所有 webpack 生成的 javascipt 作为同步 script 元素合并到生成的 html 中。
vue.config.js 中 configureWebpack,runtimeChunk作用是为了线上更新版本时，充分利用浏览器缓存，使用户感知的影响到最低。
 使用see <https://www.jianshu.com/p/714ce38b9fdc>

splitChunks：如果使用了某些长期不会改变的库，像 element-ui ，打包完成有 600 多 KB ，包含在默认 vendor 中显然不合适，每次用户都要加载这么大的文件体验不好，所以要单独打包

configureWebpack 和chainWebpack的作用相同，唯一的区别就是它们修改webpack配置的方式不同：

 see  <https://www.jianshu.com/p/27d82d98a041>

- configureWebpack 通过操作对象的形式，来修改默认的webpack配置，该对象将会被 webpack-merge 合并入最终的 webpack 配置(合并替换)
- chainWebpack 通过链式编程的形式，来修改默认的webpack配置（修改）

# router.js中

  resetRouter()方法：重置matcher可达到路由还原效果，用户退出时调用
