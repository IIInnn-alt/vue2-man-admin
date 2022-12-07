<!--
 * @Author: mn
 * @Date: 2022-09-21 14:59:46
 * @LastEditors: mn
 * @LastEditTime: 2022-11-30 16:46:46
 * @Description: 
-->
<template>
  <el-popover placement="right" trigger="click">
    <div class="icon-body">
      <el-input
        v-model="iconName"
        clearable
        placeholder="搜索关键字"
        @clear="filterIcons"
        @input.native="filterIcons"
        size="small"
      ></el-input>
      <div class="icon-box">
        <div class="icon-list">
          <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
            <div><svg-icon :icon-class="item" class-name="customSize" /></div>
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-input slot="reference" v-model="selectName" clearable placeholder="图标">
      <svg-icon v-if="selectName" slot="prefix" :icon-class="selectName" class-name="customSize1" />
    </el-input>
  </el-popover>
</template>

<script>
import icons from './requireIcons'
export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      iconName: null,
      iconList: icons
    }
  },
  computed: {
    selectName: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    filterIcons() {
      this.iconList = icons
      if (this.iconName) {
        this.iconList = this.iconList.filter(item => item.includes(this.iconName))
      }
    },
    selectedIcon(name) {
      this.$emit('input', name)
      document.body.click()
    },
    reset() {
      this.iconName = ''
      this.iconList = icons
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-body {
  width: 400px;
  .icon-box {
    margin-top: 10px;
    height: 400px;
    overflow-y: auto;
    .icon-list {
      display: flex;
      flex-wrap: wrap;
      & > div {
        width: 130px;
        height: 50px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        margin-right: -1px;
        margin-bottom: -1px;
        .customSize {
          margin-top: 6px;
        }
        & > div:nth-of-type(2) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
::v-deep .el-input__prefix {
  line-height: 36px;
}
.customSize1 {
  width: 1.3em;
  height: 1.3em;
  vertical-align: text-bottom;
}
</style>
