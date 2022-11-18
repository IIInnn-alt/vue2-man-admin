<template>
  <el-dialog
    id="dialog"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="70%"
    v-if="dialogVisible"
    :title="title"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    /* 监听 */
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#dialog {
  overflow: hidden;
  ::v-deep .el-dialog:not(.is-fullscreen) {
    left: 1%;
    top: 50%;
    transform: translateY(-50%);
  }

  ::v-deep .el-dialog__body {
    overflow: hidden;
    height: 80vh;
    max-height: 80vh;
    padding: 0 !important;
  }
  // 全屏时
  // ::v-deep .is-fullscreen .el-dialog__header {
  //   height: 60px !important;
  // }
  // ::v-deep .is-fullscreen .el-dialog__body {
  //   height: calc(100% - 60px);
  //   max-height: calc(100% - 60px);
  // }
}
//全屏时的 叉号
// ::v-deep .el-dialog__headerbtn {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     padding: 0;
//     background: 0 0;
//     border: none;
//     outline: 0;
//     cursor: pointer;
//     font-size: 16PX;
// }
</style>
