<template>
  <div class="app-container">
    <m-card>
      <div slot="header" class="headerLabel">VueI18n</div>
      当前语言为
      <m-select v-model="currentLang" :data="dataSource" placeholder="请选择"></m-select>
      <p>
        <el-button type="primary" size="default">{{ $t('你好') }}</el-button>
        <el-button type="primary" size="default">{{ $t('点击') }}</el-button>
        <el-button type="primary" size="default">{{ $t('qieHuan') }}</el-button>
        <el-button type="primary" size="default">{{ translateTitle('yuYan') }}</el-button>
      </p>
      <p>
        需要使用 🌍 VsCode + 插件 i18n-ally
        <el-link type="success" href="https://github.com/lokalise/i18n-ally" target="_blank">(链接)</el-link>
      </p>
      <ul>
        <li>
          1.VsCode商城中下载 i18n-ally,并在根目录下新建 .vscode/settings.json
          <preview-code :code="code"></preview-code>
        </li>
        <li>
          2.npm i vue-i18n@8.27.0 (vue2下载8.xx版本 vue3下载9.xx版本)
          <br />
          根据i18n-ally.localesPaths": ["src/i18n/lang"] 建立文件夹
          <br />
          <el-image style="width: 100px; height: 100px" :src="img" :preview-src-list="srcList"></el-image>
        </li>
        <li>
          3.在i18n/index.js
          <preview-code :code="code1"></preview-code>
        </li>
        <li>
          4.在main.js
          <preview-code :code="code2"></preview-code>
        </li>
        <li>
          5.在lang 需要建立 zh.json、en.json,json格式才会写入
          <el-image style="width: 100px; height: 100px" :src="img1" :preview-src-list="srcList"></el-image>
        </li>
        <li>
          6.案例
          <el-image style="width: 100px; height: 100px" :src="img2" :preview-src-list="srcList"></el-image>
        </li>
      </ul>
    </m-card>
  </div>
</template>

<script>
import img from './img.jpg'
import img1 from './img1.jpg'
import img2 from './img2.jpg'
export default {
  name: 'i18n',
  data() {
    return {
      dataSource: [
        { id: 'zh', label: '中文' },
        { id: 'en', label: '英文' }
      ],
      img,
      img1,
      img2,
      srcList: [img, img1, img2],
      code: '',
      code1: '',
      code2: ''
    }
  },
  computed: {
    currentLang: {
      get() {
        return this.$store.getters.language
      },
      set(val) {
        this.$store.dispatch('settings/changeLanguage', val).then(() => {
          this.$i18n.locale = val
          document.querySelector('html').setAttribute('lang', val)
        })
      }
    }
  },
  created() {
    this.code = `
        "i18n-ally.localesPaths": ["src/i18n/lang"], //翻译文件夹路径
        // "i18n-ally.keystyle": "nested", //翻译路径格式 nested:嵌套式  flat:扁平式
        // "i18n-ally.sortKeys": true,
        "i18n-ally.namespace": true,
        // "i18n-ally.pathMatcher": "{locale}/{namespaces}.{ext}",
        "i18n-ally.enabledParsers": ["json", "js", "ts"],
        "i18n-ally.extract.keygenStyle": "camelCase", // 翻译字段命名样式采用驼峰
        "i18n-ally.sourceLanguage": "zh", // 翻译源语言 是你翻译文件的名字
        "i18n-ally.displayLanguage": "en", //显示语言， 这里也可以设置显示英文为en
        "i18n-ally.enabledFrameworks": [
          "vue",
          "react"
        ],
        "i18n-ally.keystyle": "nested" //指定要使用的框架支持。如果未设置任何值，插件将自动检测框架
      `

    this.code1 = `
      import Vue from 'vue'
      import store from '@/store'
      import VueI18n from 'vue-i18n'
      import ElementLocale from 'element-ui/lib/locale'
      import elEn from 'element-ui/lib/locale/lang/en'
      import elZh from 'element-ui/lib/locale/lang/zh-CN'
      import en from './lang/en.json'
      import zh from './lang/zh.json'

      Vue.use(VueI18n)

      const defaultLang = store.getters.language
      const messages = {
        en: {
          ...en,
          ...elEn
        },
        zh: {
          ...zh,
          ...elZh
        }
      }

      const i18n = new VueI18n({
        silentTranslationWarn: true,
        locale: defaultLang,
        fallbackLocale: defaultLang,
        messages
      })

      document.querySelector('html').setAttribute('lang', defaultLang)

      ElementLocale.i18n((key, value) => i18n.t(key, value))

      export function i18nRender(key) {
        return i18n.t(key)
      }

      export default i18n
      `
    this.code2 = `
      import Vue from 'vue'
      import App from './App.vue'
      import router from './router'
      import store from './store'
      import i18n from '@/i18n'
      new Vue({
        router,
        store,
        i18n,
        render: h => h(App)
      }).$mount('#app')
      `
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
