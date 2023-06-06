/*
 * @Author: mn
 * @Date: 2022-05-23 14:06:14
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 15:06:13
 * @Description: vue.config.js 配置
 */
const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())
const CompressionPlugin = require('compression-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProd = process.env.NODE_ENV === 'production' //是否是生产环境

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}

// 打印环境变量
// console.log(process.env, 'process.env')
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')

module.exports = {
  // 基本路径
  publicPath: isProd ? './' : '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查 有效值：ture | false | 'error'
  lintOnSave: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // babel-loader 默认会跳过 node_modules 依赖。
  transpileDependencies: [],
  // 组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）
  // template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
  // runtime-only：将template在打包的时候，就已经编译为render函数
  // runtime-compiler：在运行的时候才去编译template
  runtimeCompiler: false,
  // use thread-loader for babel & TS in production build
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},

  /* 调整内部的 webpack 配置 ,合并入最终的 webpack 配置(合并替换) */
  configureWebpack: {
    plugins: [
      // IgnorePlugin: webpack内置插件,忽略第三方包指定目录，让这些指定目录不要被打包进去
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // DefinePlugin 用来定义全局变量，在webpack打包的时候会对这些变量做替换,在main.js 打印 BUILD_DATE、APP_VERSION
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      }),
      //gzip压缩  需要 npm i -D compression-webpack-plugin@5.0.2
      // /\.(js|css|woff|woff2|ttf|eot|png|svg|jpg|jpeg)(\?.*)?$/i,
      new CompressionPlugin({
        cache: false, // 不启用文件缓存
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      })
    ],

    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  /** vue3.0内置了webpack所有东西，
   * see https://cli.vuejs.org/zh/config/?#chainwebpack
   * webpack-chain see https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans
   * chainWebpack 是个函数 接收一个基于 webpack-chain 的 ChainableConfig实例,允许对内部的 webpack 配置进行更细粒度的修改 （直接修改)
   **/
  chainWebpack: config => {
    config.plugins.delete('preload') // 删除预加载
    config.plugins.delete('prefetch') // 删除预加载
    // config.resolve.symlinks(true) // 修复热更新失效
    // 使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 在public/index.html中  htmlWebpackPlugin.options.title
      //  see https://github.com/jantimon/html-webpack-plugin#options
      // args[0].title= 'title'
      if (isProd) {
        // see https://cli.vuejs.org/zh/guide/html-and-static-assets.html
        args[0].cdn = assetsCDN
      }
      return args
    })
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
    //压缩图片 cnpm i -D image-webpack-loader  npm下载会有莫名其妙问题,建议 yarn或者cnpm
    config.module
      .rule('images')
      .test(/\.(jpe?g|png|gif)$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        // 此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快
        disable: !isProd ? true : false,
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    // svg图片拼接成雪碧图  set svg-sprite-loader  npm i -D svg-sprite-loader
    // 原有的 svg规则 exclude排除 icons所在的文件件，然后使用 icons规则（加载svg-sprite-loader） include指定icons所在的文件
    //  也可以 see  https://cli.vuejs.org/zh/guide/webpack.html#替换一个规则里的-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // url-loader 将文件转换为 base64 URI loader $ npm i -D url-loader
    // url-loader 中要将 icons 文件夹排除, 不让 url-loader 处理该文件夹
    //  see https://github.com/webpack-contrib/url-loader#mimetype
    // 此项目中 仅处理 .xlsx 本地获取下载
    config.module
      .rule('xlsx')
      .test(/\.xlsx$/)
      .exclude.add(resolve('src/assets/icons'))
      .end()
      .include.add(resolve('src/assets/files'))
      .end()
      .use('url-loader')
      .loader('url-loader')
      .end()
    // 生产模式下
    config.when(isProd, config => {
      //  npm install -D script-ext-html-webpack-plugin ,见note.md
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // // 只打包初始时依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 单独将 elementUI 拆包
            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), //  可自定义拓展你的规则
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin  生产环境下是true,开发环境下是false
    // extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        prependData: '@import "~@/styles/variables.scss";'
        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        // additionalData(content, loaderContext) {
        //   const { resourcePath, rootContext } = loaderContext
        //   const relativePath = path.relative(rootContext, resourcePath)
        //   if (relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss') {
        //     return '@import "~@/styles/variables.scss";' + content
        //   }
        //   return content
        // }
      }
    }
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    // requireModuleExtension: false // 去掉文件名中的 .module
  },

  // webpack-dev-server 相关配置
  //  see https://webpack.js.org/configuration/dev-server/
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 编译完成是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 1030, // 访问端口
    hot: true, // 开启热加载
    disableHostCheck: true
    // proxy: {
    //设置代理 ,解决跨域，替换域名 --> request.js
    // '/devApi': {
    //   target: 'http://localhost:3000', //目标服务器 API服务器的地址
    //   changeOrigin: true, //// 允许跨域
    //   pathRewrite: {
    //     //路径重写
    //     '^/devApi': '' //// 去掉请求地址中的 /devApi 前缀
    //   }
    // }
    // 对/devApi/users 的请求会将请求代理到 http://localhost:3000/users
    // }
  },
  /**
   * 第三方插件配置
   */
  pluginOptions: {}
}
