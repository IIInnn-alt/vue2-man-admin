<!--
 * @Author: mn
 * @Date: 2022-06-25 13:48:35
 * @LastEditors: mn
 * @LastEditTime: 2022-06-25 13:50:25
 * @Description: 动态组件切换
-->
<template>
  <div class="contentsA">
    <transition name="fade-transform" mode="out-in">
      <component :is="apps"></component>
    </transition>
  </div>
</template>
<script>
export default {
  name: "A",
  data() {
    return {
      Child: this.comChilds,
      apps: {}
    };
  },
  props: {
    comChilds: {
      type: String
    },
    menuId: {
      type: Number
    }
  },
  created() {
    if (this.comChilds) {
      if (this.comChilds[0] == "/") {
        this.Child = this.comChilds.substring(1, this.comChilds.length + 1);
      } else {
        this.Child = this.comChilds;
      }
    }
  },
  beforeMount() {
    this.apps = resolve => require([`@/views/${this.Child}`], resolve);
  }
};
</script>
<style scoped>
.contentsA {
  height: 100%;
}
</style>
