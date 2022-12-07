<!--
 * @Author: mn
 * @Date: 2022-08-18 15:58:06
 * @LastEditors: mn
 * @LastEditTime: 2022-11-22 16:31:57
 * @Description: dialog 优化封装
-->
<template>
  <div>
    <el-dialog
      id="elDialog"
      :lock-scroll="false"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :width="width"
      append-to-body
      v-if="visible"
      :before-close="close"
      :custom-class="customClass"
      v-bind="$attrs"
    >
      <slot></slot>
      <div slot="title" v-html="title"></div>
      <div slot="footer" class="dialog-footer" v-if="isFooter">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">{{ sureName }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'set-dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '35%'
    },
    isFooter: {
      //是否展示按钮
      type: Boolean,
      default: true
    },
    sureName: {
      //确认按钮名称
      type: String,
      default: '确 认'
    },
    customClass: {
      type: String,
      default: 'customDialog'
    }
  },

  data() {
    return {
      $throttle: null //节流函数
    }
  },
  mounted() {
    this.$throttle = this.throttle(() => {
      this.$emit('submit')
    }, 3000)
  },
  methods: {
    submitForm() {
      this.$throttle()
    },
    cancel() {
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    // 节流  一段时间内首次触发时立即执行，此时间段内再次触发不再执行
    throttle(fn, t) {
      let last
      let timer
      let interval = t || 1000
      return function () {
        let args = arguments
        let now = +new Date()
        if (last && now - last < interval) {
          last = now
          clearTimeout(timer)
          timer = setTimeout(() => {
            last = null
          }, interval)
        } else {
          last = now
          fn.apply(this, args)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.el-dialog.h70 .el-dialog__body {
  max-height: 70vh !important;
}
.el-dialog.padding10 .el-dialog__body {
  padding: 15px 20px !important;
}
.el-dialog.padding0 .el-dialog__body {
  padding: 0px !important;
}

.el-dialog.failure .el-dialog__body {
  max-height: 70vh !important;
  padding: 15px 20px !important;
}
</style>

