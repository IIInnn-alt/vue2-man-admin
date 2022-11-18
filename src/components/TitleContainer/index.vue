<!--
 * @Author: mn
 * @Date: 2022-06-16 17:13:33
 * @LastEditors: mn
 * @LastEditTime: 2022-06-16 18:14:09
 * @Description: 
-->
<template>
  <div class="titleBox" id="title-container">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.titleBox {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding:10px 10px 0 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 3px;
  .el-button {
    margin: 0;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  ::v-deep .el-input {
    margin-right: 1%;
    margin-bottom: 10px;
    width: 14%;
    &.is-disabled .el-input__inner {
      cursor: text !important;
    }
    // @media screen and (max-width: 1600px) {
    //   .el-input__inner {
    //     height: 34px;
    //   }
    // }
  }
  .el-select {
    margin-right: 1%;
    width: 14%;
    ::v-deep .el-input {
      width: 100% !important;
    }
  }
  .el-autocomplete {
    margin-right: 1%;
    ::v-deep .el-input {
      width: 100%;
    }
  }

  // 时间选择器
  ::v-deep.el-range-editor {
    width: 25%;
    margin-right: 1%;
    margin-bottom: 10px;
    // @media screen and (max-width: 1600px) {
    //   height: 34px;
    // }
    // .el-range-input {
    // @media screen and (max-width: 1600px) {
    //   margin-top: 1px;
    //   font-size: 13px;
    // }
    // }
  }
  ::v-deep .el-date-editor {
    width: 19%;
    margin-bottom: 10px;
    // @media screen and (max-width: 1600px) {
    //   .el-input__inner {
    //     margin-top: 1px;
    //     height: 34px;
    //   }
    // }
  }
}
</style>
