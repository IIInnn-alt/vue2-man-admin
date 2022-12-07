<!--
 * @Author: mn
 * @Date: 2022-11-07 17:05:46
 * @LastEditors: mn
 * @LastEditTime: 2022-11-23 10:00:00
 * @Description: 
-->
<template>
  <m-card>
    <div slot="header">链接</div>
    <div class="common_links">
      <div v-for="(item, index) in links" :key="index" class="link_box">
        <p>
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </p>
        <p>{{ item.info }}</p>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
  name: 'links',
  data() {
    return {
      links: [
        {
          name: 'Vue-vben-admin',
          url: 'https://github.com/vbenjs/vue-vben-admin',
          info: '一个免费开源的中后台模版。使用了最新的vue3,vite2,TypeScript等主流技术开发,开箱即用的中后台前端解决方案'
        },
        {
          name: 'Vue-admin-better',
          url: 'https://github.com/chuzhixin/vue-admin-better',
          info: '多个中后台模版,使用了不同技术开发,vue2,vue3,vite2,TypeScript等技术开箱即用的中后台前端解决方案'
        },
        {
          name: 'Fantastic-admin',
          url: 'https://hooray.gitee.io/fantastic-admin/',
          info: '杰出的管理系统框架'
        },
        {
          name: 'RuoYi-Vue',
          url: 'http://www.ruoyi.vip/',
          info: '一套全部开源的快速开发平台'
        },
        {
          name: 'Yudao-vue-pro',
          url: 'https://doc.iocoder.cn/intro/',
          info: 'RuoYi-Vue 全新 Pro 版本，优化重构所有功能'
        },
        {
          name: 'Vue-bag-admin',
          url: 'https://github.com/hangjob/vue-bag-admin',
          info: 'Vue3+Vite2.6+TypeScript+ant-design-vue+egg.js+mysql构建'
        },
        {
          name: 'Color Hunt',
          url: 'https://colorhunt.co/',
          info: '设计配色方案'
        },
        {
          name: 'Uiverse',
          url: 'https://uiverse.io/',
          info: 'Button、Input等loading效果'
        },
        {
          name: '♥Codepen',
          url: 'https://codepen.io/your-work',
          info: '代码编译、其他优秀的代码集合'
        },
        {
          name: '⭐CSS Inspiration ',
          url: 'https://chokcoco.github.io/CSS-Inspiration/#/',
          info: 'CSS 的灵感'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.common_links {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .link_box {
    width: 320px;
    height: 120px;
    border: 1px solid rgb(239, 239, 245);
    border-radius: 3px;
    margin: 8px 0;
    padding: 0px 10px;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
    }
    p:nth-child(1) {
      color: #316c72;
      font-size: 18px;
      text-decoration: underline;
    }
    p:nth-child(2) {
      color: $theme;
      font-size: 14px;
    }
  }
}
</style>
