<!--
 * @Author: mn
 * @Date: 2022-03-04 10:26:24
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 17:12:25
 * @Description: remote-select 选择器 远程搜索  单选
-->
<template>
  <el-select
    v-model="selectValue"
    filterable
    remote
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    @change="selectChange"
    :remote-method="remoteMethod"
    :loading="loading"
    :id="randomId"
    @visible-change="visibleChange"
  >
    <el-option
      v-if="addOptions && addOptions[valueCode]"
      :key="randomId"
      :label="addOptions[labelCode]"
      :value="addOptions[valueCode]"
    >
      <slot :data="addOptions"></slot>
    </el-option>
    <template v-for="(item, index) in dataSouce">
      <el-option
        v-if="item[valueCode] != (addOptions && addOptions[valueCode])"
        :key="index"
        :label="item[labelCode]"
        :value="item[valueCode]"
      >
        <slot :data="item"></slot>
      </el-option>
    </template>

    <div v-if="isVisiable()" class="moreThan" @click="moreThan">搜索更多</div>
  </el-select>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'set-select',
  props: {
    // v-mode 值
    value: {
      type: Number / String,
      default: undefined
    },
    apiName: {
      type: String,
      default: '',
      required: true
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
    // 搜索参数 字段
    searchCode: {
      type: String,
      default: '',
      required: true
    },
    // 接口搜索条件
    queryParams: {
      type: Object,
      default: () => {}
    },
    clearable: {
      type: Boolean,
      default: true
    },
    // 列表中没有value对应的数据，可手动添加
    addData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dataSouce: [],
      deepData: [],
      deepTotal: 0,
      loading: false,
      remoteValue: '',
      randomId: null,
      pages: {
        page: 1,
        limit: 99
      },
      total: 0,
      addOptions: {}
    }
  },
  async created() {
    this.addOptions = this.addData
    this.randomId = 'remoteSelect' + Math.random().toString().substr(3, 3)
    if (this.apiName && this.$api[this.apiName]) {
      try {
        this.dataSouce = await this.getData(this.apiName)
        console.log(this.dataSouce,'lthis.dataSouce');
        this.deepData = lodash.cloneDeep(this.dataSouce)
        this.deepTotal = lodash.cloneDeep(this.total)
      } catch (e) {}
    }
  },
  mounted() {
    //.parentElement.children[1]
    // console.log(document.getElementById('remote-select').nextElementSibling,'sss');
    document.querySelector(`#${this.randomId} + .el-input__suffix .el-input__icon`).classList.add('el-icon-arrow-up')
    //
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
    // 搜索更多
    moreThan() {
      this.pages.page++
      this.loading = true
      let moreSearch = async () => {
        this.addOptions = {}
        let data = await this.getData(this.apiName, { [this.searchCode]: this.remoteValue })
        this.dataSouce = [...this.dataSouce, ...data]
        this.loading = false
      }
      lodash.debounce(moreSearch, 1500)()
    },
    selectChange(value) {
      if (!value) {
        // 清除，恢复原数据
        this.remoteMethod('')
      }
      this.$emit('input', value) //抛出去 给 v-model  也就是：:value
      let options = this.dataSouce.find(item => {
        return item[this.valueCode] === value
      })
      this.$emit('change', value, options)
    },
    async getData(apiName, query = {}) {
      const params = Object.assign({ ...this.queryParams }, this.pages, query)
      let res = await this.$api[apiName](params)
      if (res.code == 200) {
        this.total = res.data.total
        return res.data.records
      } else {
        return []
      }
    },
    remoteMethod(value) {
      this.remoteValue = value.trim()
      this.loading = true
      this.pages.page = 1
      let loadSearch = async () => {
        if (value.trim() && value != '' && value != null) {
          this.addOptions = {}
          this.dataSouce = await this.getData(this.apiName, { [this.searchCode]: value })
        } else {
          this.addOptions = this.addData
          this.dataSouce = this.deepData
          this.total = this.deepTotal
        }
        this.loading = false
      }
      lodash.debounce(loadSearch, 1500)()
    },
    isVisiable() {
      // 是否显示更多
      let count = this.pages.page * this.pages.limit
      return this.total > count ? true : false
    },
    visibleChange() {
      document.querySelector(`#${this.randomId} + .el-input__suffix .el-input__icon`).classList.toggle('is-reverse')
    }
  }
}
</script>
<style lang="scss" scoped>
.moreThan {
  padding: 0 20px;
  font-size: 14px;
  height: 36px;
  line-height: 40px;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  cursor: pointer;
  border-top: 1px solid #e8e8e8;
  // &:hover {
  //   background-color: #f5f7fa;
  // }
}
</style>



