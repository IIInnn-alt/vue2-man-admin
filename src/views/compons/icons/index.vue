<!--
 * @Author: mn
 * @Date: 2022-11-30 11:13:03
 * @LastEditors: mn
 * @LastEditTime: 2022-12-07 16:51:05
 * @Description: 
-->
<template>
  <div class="app-container">
    <m-card>
      <div slot="header">
        Iconify图标组件
        <el-link type="success" href="https://iconify.design/" target="_blank">(链接)</el-link>
        <el-popover placement="right" width="400" trigger="hover">
          <span>1. npm install --save-dev @iconify/vue2</span>
          <br />
          <span>2. 文件中 import { Icon } from '@iconify/vue2';</span>
          <br />
          <span>3. &lt; Icon icon="mdi-light:home" /&gt;</span>
          <span class="use" slot="reference">如何使用 https://icon-sets.iconify.design/</span>
        </el-popover>
      </div>
      <div class="iconifyIcons-box">
        <div
          v-for="(item, index) in iconifyIcons"
          class="iconify-item"
          :key="index"
          @click="handleClipboard(generateIconifyCode(item), $event)"
        >
          <Icon :icon="item" class="c_icon" />
          <span>{{ item }}</span>
        </div>
      </div>
    </m-card>
    <m-card>
      <div slot="header">icons图标选择</div>
      <icon-select class="icon-select" v-model="selectIcon"></icon-select>
    </m-card>
    <m-card>
      <div slot="header">icons图标(点击复制)</div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="自定义图标" name="first">
          <div
            v-for="(item, index) in svgIcons"
            :key="index"
            class="icon-item"
            @click="handleClipboard(generateIconCode(item), $event)"
          >
            <svg-icon :icon-class="item" class-name="custom-icon" />
            <span>{{ item }}</span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="elementUI图标" name="second">
          <div
            v-for="(item, index) in elementIcons"
            :key="index"
            class="icon-item"
            @click="handleClipboard(generateElementIconCode(item), $event)"
          >
            <i :class="'el-icon-' + item" />
            <span>{{ item }}</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </m-card>
  </div>
</template>

<script>
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import iconifyIcons from './iconify'
import clipboard from '@/utils/clipboard'
import IconSelect from '@/components/IconSelect'
import { Icon } from '@iconify/vue2'
export default {
  name: 'icons',
  components: { IconSelect, Icon },
  data() {
    return {
      activeName: 'first',
      svgIcons,
      elementIcons,
      iconifyIcons,
      selectIcon: ''
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    generateIconifyCode(symbol) {
      return `<Icon :icon="${symbol}" class="c_icon" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.use {
  display: inline-block;
  margin: 0 10px;
  color: $theme;
  font-size: 14px;
  text-decoration: underline;
}
.iconifyIcons-box {
  display: flex;
  flex-wrap: wrap;
  .iconify-item {
    height: 60px;
    width: 100px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $panGreen;
    }
    .c_icon {
      font-size: 24px;
      margin: 0 auto;
    }
    span {
      display: block;
      font-size: 14px;
      margin-top: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.icon-select {
  display: inline-block;
  width: 200px;
}
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
  &:hover {
    color: $panGreen;
  }
  .custom-icon {
    color: inherit;
    margin-top: 20px;
    pointer-events: none; // main
  }
  span {
    display: block;
    font-size: 14px;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
