<!--
 * @Author: mn
 * @Date: 2022-12-07 17:09:53
 * @LastEditors: mn
 * @LastEditTime: 2022-12-09 15:34:28
 * @Description: 
-->
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="npm" name="1">
        <npm-doc></npm-doc>
      </el-tab-pane>
      <el-tab-pane label="yarn" name="2">
        <yarn-doc></yarn-doc>
      </el-tab-pane>
      <el-tab-pane label="pnpm" name="3">
        <pnpm-doc></pnpm-doc>
      </el-tab-pane>
      <el-tab-pane label="nvm管理node" name="4">
        <nvm-doc></nvm-doc>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import npmDoc from './npm.vue'
import yarnDoc from './yarn.vue'
import pnpmDoc from './pnpm.vue'
import nvmDoc from './nvm.vue'
export default {
  name: 'node',
  components: { npmDoc, yarnDoc, pnpmDoc,nvmDoc },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs {
  height: calc(100vh - 132px); // 112 + 10+ 10
  background: #fff;
  ::v-deep {
    .el-tabs__header {
      background: #fff;
      margin-bottom: 0;
      padding: 0 15px;
    }
    .el-tabs__content {
      height: calc(100% - 41px); //41 是el-tabs__header height
      .el-tab-pane {
        height: 100%;
        overflow-y: auto;
        background: #fff;
        padding: 10px;
      }
    }
  }
}
</style>
