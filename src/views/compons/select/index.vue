<!--
 * @Author: mn
 * @Date: 2022-12-12 11:04:34
 * @LastEditors: mn
 * @LastEditTime: 2023-05-06 09:29:32
 * @Description: 
-->
<template>
  <div class="app-container">
    <m-card>
      <div slot="header" class="headerLabel">基础select</div>
      <div>
        <m-select v-model="value" :data="dataSource" placeholder="请选择"></m-select>
        <preview-code :code="code"></preview-code>
      </div>
    </m-card>
    <m-card>
      <div slot="header" class="headerLabel">远程select</div>
      <div>
        <remote-select
          v-model="value2"
          apiName="getSelectData"
          valueCode="id"
          labelCode="label"
          searchCode="label"
          ref="remoteSelect"
          placeholder="请选择"
        ></remote-select>
        <preview-code :code="code1"></preview-code>
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
      value2: '',
      code: `<m-select v-model="value" :data="dataSource" valueCode="id" labelCode="label" placeholder="请选择"></m-select>
             valueCode 绑定的code字段,默认为id  labelCode 展示字段code,默认为label
      `,
      code1: `<remote-select v-model="value2" apiName="getSelectData" valueCode="id" labelCode="label" searchCode="label" :addData="{}" ref="remoteSelect" placeholder="请选择"></remote-select>
      valueCode 绑定的code字段,默认为id  labelCode 展示字段code,默认为label, apiName为远程搜索接口, searchCode为接口查询字段、addData 针对数据回显时,回显得数据按照所需格式进行绑定
      `
    }
  }
}
</script>

<style lang="scss" scoped></style>
