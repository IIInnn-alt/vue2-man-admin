<!--
 * @Author: mn
 * @Date: 2022-03-04 10:26:24
 * @LastEditors: mn
 * @LastEditTime: 2022-11-29 11:13:16
 * @Description: select 选择器
-->
<template>
  <el-select v-model="selectValue" filterable :placeholder="placeholder" @change="selectChange" v-bind="$attrs">
    <el-option v-for="(item, index) in data" :key="index" :label="item[labelCode]" :value="item[valueCode]">
      <slot></slot>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'set-select',
  props: {
    //数据源
    data: {
      type: Array,
      default: () => []
    },
    // v-mode 值
    value: {
      type: Number / String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },

    valueCode: {
      type: String,
      default: 'id' //默认字段id
    },
    labelCode: {
      type: String,
      default: 'label' //默认字段label
    }
  },
  computed: {
    selectValue: {
      get: function () {
        return this.value
      },
      set: function () {}
    }
  },
  methods: {
    // filterOption(input, option) {
    //   return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    // },
    selectChange(value) {
      this.$emit('input', value) //抛出去 给 v-model  也就是：:value
      let options = this.data.find(item => {
        return item[this.valueCode] == value
      })
      this.$emit('change', value, options)
    }
  }
}
</script>
