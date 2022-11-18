<!--
 * @Author: mn
 * @Date: 2022-07-19 15:57:38
 * @LastEditors: mn
 * @LastEditTime: 2022-11-07 17:27:24
 * @Description: 
-->
<template>
  <div class="app-container">
    <my></my>
    <links></links>
  </div>
</template>

<script>
import { coms } from './components'
export default {
  name: 'home',
  components: { ...coms },
  data() {
    return {}
  },
  computed: {},
  created() {}
}
</script>

<style lang="scss" scoped></style>
