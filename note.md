<!--
 * @Author: mn
 * @Date: 2022-06-02 17:29:53
 * @LastEditors: mn
 * @LastEditTime: 2022-12-07 17:24:21
 * @Description: 笔记
-->

# npm

 see <https://juejin.cn/post/7031339747125493790#heading-12>
-S, --save 安装包信息将加入到dependencies（生产阶段的依赖,也就是项目运行时的依赖，就是程序上线后仍然需要依赖）

-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖，就是我们在开发过程中需要的依赖，只在开发阶段起作业的，编译构建的）

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

css相关配置
extract:是否使用css分离插件 ExtractTextPlugin 用于控制是否强制分离vue 组件内的css  默认生产环境下是true,开发环境下是false

官方解释：是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。

同样当构建 Web Components 组件时它总是会被禁用 (样式是 inline 的并注入到了 shadowRoot 中)。

当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS。

提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。然而，你仍然可以将这个值显性地设置为 true 在所有情况下都强制提取。
see <https://blog.csdn.net/weixin_44869002/article/details/105831757>

sourceMap:建议false, 开启可能会影响构建性能。 通过css.sourceMap，可以明确的指导css代码在项目文件中的位置。

# router.js中

  resetRouter()方法：重置matcher可达到路由还原效果，用户退出时调用

# vue中使用v-bind="$attrs"和v-on="$listeners"进行多层组件监听

  see <https://juejin.cn/post/6910078053066489864>
