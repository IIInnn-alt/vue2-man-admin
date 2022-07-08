<!--
 * @Author: mn
 * @Date: 2022-05-23 15:04:43
 * @LastEditors: mn
 * @LastEditTime: 2022-05-27 16:21:01
 * @Description: 
-->
# 本文对 .env 文件配置的解释

## vue作为前端项目，运行在客户的浏览器中，没有process全局对象，不像node项目，运行在后端os中，有process全局对象,变量也只是node能访问，浏览器中是没有的,但在项目中调用process.env使用是因为node 通过 vue-cli-service工具（也称之为脚手架）将前端中使用process.env的地方，在build（构建或打包）时，替换为node环境中的process.env的值

## [.env生效原理]: <https://www.jianshu.com/p/3855050ae36b>

## 文件说明

.env：全局默认配置文件，无论什么环境都会加载合并。

.env.development：开发环境的配置文件

.env.production：生产环境的配置文件

`注意：三个文件的文件名必须按上面方式命名，不能乱起名，否则读取不到文件`

## 内容格式

  ENV = 'development'

  VUE_APP_BASE_API = 'http://localhost:8001'

`注意：属性名必须以 VUE_APP_ 开头，如：VUE_APP_XXX, vue-cli强制要求的`

## 加载

vue 会根据启动命令自动加载相对应的环境配置文件。vue是根据文件名进行加载的，所以上面说 不要乱起名，也无需专门控制加载哪个文件

比如执行npm run serve命令，会自动加载.env.development文件
比如执行npm run serve:man命令，会自动加载.env.man 文件

开发环境加载 .env 和 .env.development 。

生成环境加载 .env 和 .env.production 。

运行npm run serve的时候主要还是看package.json中 server属性的--mode后面跟的是啥。如果是development，就会加载.env.development文件。

在package.json里面配置好，执行serve的时候用开发环境的。build打包用生产或者测试的

`可查看此项目中的package.json 示例  "serve:man": "vue-cli-service serve --mode man"`

```bash
终端执行命令  npm run serve:man
```

## 优先级

环境配置文件 > 全局配置文件

当全局的配置文件和环境的配置文件有相同配置项时，环境的配置项会覆盖全局的配置项

```bash
.env文件中
    VUE_APP_NAME=vue2
```

```bash
.env.development文件中
    VUE_APP_NAME=vue3
```

```bash
console.log(process.env.VUE_APP_NAME) ==> VUE_APP_NAME：vue3
```

## 项目中使用

运行 npm run serve:man

在项目中src下 .js、.vue文件中 打印 process.env

可以使用 process.env.xxx 来访问属性

`注意：1.打印出来的process.env中属性 默认只包含 以 VUE_APP_ 开头的属性,自定义的名字是打印不出来的（当前项目环境变量）`

`2.可在vue.config.js文件中全部打印出来,在终端进行查看（node.js访问）`

### 想在项目中使用 自定义的名字

终端执行命令  npm run serve:man  加载.env.man文件

想在项目中 .js .vue中使用我们自定义的名字 需要用 dotenv

npm 官方文档的这样介绍 dotenv: Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中

npm install dotenv

require('dotenv').config({ path: '.env.man' })

// 使用
console.log(process.env.NAME)
