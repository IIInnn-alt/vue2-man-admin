<!--
 * @Author: mn
 * @Date: 2022-03-04 10:26:24
 * @LastEditors: mn
 * @LastEditTime: 2022-05-11 14:27:37
 * @Description: select 选择器
-->
<template>
  <el-select
    v-model="selectValue"
    filterable
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    @change="selectChange"
  >
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
    disabled: {
      type: Boolean,
      default: false
    },
    valueCode: {
      type: String,
      default: 'id' //默认字段id
    },
    labelCode: {
      type: String,
      default: 'label' //默认字段label
    },
    clearable: {
      type: Boolean,
      default: true
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
        return item[this.valueCode] === value
      })
      this.$emit('change', value, options)
    }
  }
}
</script>


