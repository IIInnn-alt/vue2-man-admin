<!--
 * @Author: mn
 * @Date: 2022-12-12 11:04:34
 * @LastEditors: mn
 * @LastEditTime: 2022-12-21 16:29:20
 * @Description: 
-->
<template>
  <div class="app-container">
    <m-card>
      <div slot="header">基础select</div>
      <div>
        <m-select v-model="value" :data="dataSource" placeholder="请选择"></m-select>
        <preview-code :code="code"></preview-code>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  name: 'mselect',
  data() {
    return {
      dataSource: [
        {
          id: 1,
          label: '选项1'
        },
        {
          id: 2,
          label: '选项2'
        },
        {
          id: 3,
          label: '选项3'
        }
      ],
      value: '',
      code: `<m-select v-model="value" :data="dataSource" valueCode="id" labelCode="label" placeholder="请选择"></m-select>
             valueCode 绑定的code字段,默认为id  labelCode 展示字段code,默认为label
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
