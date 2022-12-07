<!--
 * @Author: mn
 * @Date: 2022-11-08 15:02:32
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 10:40:08
 * @Description: 
-->
<template>
  <div class="app-container">
    <title-container>
      <el-input
        v-model="queryParams.username"
        placeholder="用户"
        @keyup.enter.native="$refs.table.refresh(true)"
        clearable
      />
      <el-button type="primary" icon="el-icon-search" @click="$refs.table.refresh(true)">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-link
        type="success"
        href="https://github.com/IIInnn-alt/vue2-man-admin/tree/master/src/views/compons/table"
        target="_blank"
      >
        本列演示封装的Table、Select、自定义校验等多个功能
      </el-link>
    </title-container>
    <m-table ref="table" :columns="columns" :data="loadData">
      <template slot="statusRender" slot-scope="scope">
        <el-tag v-if="scope.row.status" type="success">使用中</el-tag>
        <el-tag v-else type="warning">暂停使用</el-tag>
      </template>
    </m-table>
    <m-dialog :title="dialogTitle" width="30%" :visible.sync="dialogVisible" @submit="submitForm">
      <add ref="add"></add>
    </m-dialog>
  </div>
</template>

<script>
import { columns, loadData } from './table.js'
import commonTable from '@/mixins/commonTable'
import add from './add.vue'
export default {
  name: 'componsTable',
  mixins: [commonTable],
  components: { add },
  data() {
    return {
      queryParams: {},
      columns: columns(this),
      loadData: loadData(this)
    }
  },
  created() {},
  methods: {
    handleAdd() {
      this.mixinAdd('用户')
    },
    submitForm() {
      this.mixinCheck().then(() => {})
    }
  }
}
</script>

<style lang="scss" scoped></style>
