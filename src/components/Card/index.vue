<!--
 * @Author: mn
 * @Date: 2022-11-04 11:35:49
 * @LastEditors: mn
 * @LastEditTime: 2022-11-07 14:58:50
 * @Description: 
-->
<template>
  <div class="card">
    <div class="card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="card__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCard',
  props: {
    header: {},
    shadow: {
      type: String
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.card {
  width: 100%;
  background: #fff;
  border: 1px solid rgb(239, 239, 245);
  border-radius: 8px;
  margin-bottom: 10px;
  .card__header {
    color: rgb(31, 34, 37);
    padding: 12px 16px;
    border-bottom: 1px solid rgb(239, 239, 245);
  }
  .card__body {
    padding: 12px 16px;
  }
}
</style>
