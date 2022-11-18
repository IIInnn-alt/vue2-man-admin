<!--
 * @Author: mn
 * @Date: 2022-06-13 14:17:02
 * @LastEditors: mn
 * @LastEditTime: 2022-11-01 13:35:58
 * @Description: 
-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" key="collapse" class="sidebar-logo-link">
        <img :src="logoImg" class="sidebar-logo" />
      </div>
      <div v-else key="expand" class="sidebar-logo-link">
        <img :src="logoImg" class="sidebar-logo" />
        <span class="sidebar-title">Vue2 Man Admin</span>
      </div>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/images/logo.jpg'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: 'Heart',
      logoImg: logoImg
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 34px;
      height: 34px;
      vertical-align: middle;
      margin-right: 12px;
      border-radius: 3px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: rgb(49, 108, 114);
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
