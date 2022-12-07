<!--
 * @Author: mn
 * @Date: 2022-06-13 14:17:02
 * @LastEditors: mn
 * @LastEditTime: 2022-11-18 16:34:20
 * @Description: 
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews || []
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 64= navbar  64   tagsview 48px*/
  height: calc(100vh - 112px);
  width: 100%;
  position: relative;
  // overflow: hidden;
  background: #f5f9fd;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 108px = navbar + tags-view = 64 + 34 */
    min-height: calc(100vh - 108px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
