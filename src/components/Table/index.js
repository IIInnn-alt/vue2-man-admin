import { Table } from 'element-ui'
import { debounce } from '@/utils'
export default {
  data() {
    return {
      localLoading: false,
      localData: [],
      localHeight: null,
      localSize: this.size || 'medium',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      tableStyle: {
        padding: '10px',
        background: '#fff',
        borderRadius: '3px'
      }
    }
  },
  props: Object.assign({}, Table.props, {
    rowKey: {
      type: [String, Function],
      default: 'id'
    },
    data: {
      type: Function,
      required: true
    },
    height: {
      type: String
    },
    columns: {
      type: Array,
      default: () => []
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          hasChildren: 'hasChildren'
        }
      }
    },
    headerCellStyle: {
      type: Function,
      default: (/*{ row, column, rowIndex, columnIndex }*/) => {
        return { background: '#EBF1F7', color: '#78848C' }
      }
    },
    cellStyle: {
      type: Function,
      default: (/** {row, column, rowIndex, columnIndex}*/) => {
        return { color: '#64696D' }
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    border: {
      type: Boolean,
      default: true
    },
    // 分页
    pagination: {
      type: Object,
      default: () => ({
        page: 1, //页数
        limit: 10 //每页条数
      })
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    background: {
      type: Boolean,
      default: true
    },
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 1600 ? 5 : 7
    },
    // 分页大小 small true false
    paginationSmall: {
      type: Boolean,
      //本项目运用了 postcss-pxtorem，不用手动监听设置 size
      // default: document.body.clientWidth < 1300 ? true : false
      default: false
    },
    layout: {
      type: String,
      default: 'total,sizes, prev, pager, next, jumper'
    }
  }),
  mounted() {
    var _this = this
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth // 窗口宽度
      _this.screenHeight = document.documentElement.clientHeight // 窗口高度
      debounce(() => {
        _this.getHeight()
      }, 1000)()
    }
  },
  created() {
    this.loadData()
  },
  watch: {
    'pagination.page': {
      handler(newVal, oldVal) {
        this.currentPage = newVal
      },
      immediate: true,
      deep: true
    },
    'pagination.limit': {
      handler(newVal, oldVal) {
        this.pageSize = newVal
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /* *
     * 表格高度计算
     */
    getHeight() {
      // 没有height,传入。 默认计算 talbe距离父级高度，和父级自身的高度 (这种情况为 上面搜索栏，下面talbe 格式布局，其他，手动计算传入height即可)
      //  数字32 为 分页的高度、10 是 分页margin-top 的高度、 20 是.tableWrapper的padding  注意  this.$refs['tableWrapper']父级要加上 定位(offsetTop)
      //  0.5 是计算的偏差量
      if (!this.height) {
        // let ele1 = document.getElementsByClassName('table-wrapper')[0]
        let ele1 = this.$refs['tableWrapper']
        let ele2 = this.$parent.$el || document.getElementsByClassName('app-container')[0]
        // let ele3 = document.getElementsByClassName('pagination-wrapper')[0]
        let ele3 = this.$refs['paginationWrapper']
        if (ele1 && ele2) {
          if (this.total == 0) {
            this.localHeight = ele2.clientHeight - ele1.offsetTop - 20 - 0.5 + 'px'
          } else {
            this.localHeight = ele2.clientHeight - ele1.offsetTop - (ele3.clientHeight || 32) - 10 - 20 - 0.5 + 'px'
          }
        }
      } else {
        this.localHeight = this.height || '50vh'
      }
    },
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      let pagination = {}
      bool &&
        ((pagination = Object.assign({ ...this.pagination })),
        (this.currentPage = this.pagination.page),
        (this.pageSize = this.pagination.limit))
      this.loadData(pagination)
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     */
    loadData(pagination) {
      this.localLoading = true
      const parameter = Object.assign({
        page: (pagination && pagination.page) || this.currentPage,
        limit: (pagination && pagination.limit) || this.pageSize
      })
      const result = this.data(parameter)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result
          .then(r => {
            if (r != null) {
              this.total = r.totalCount || 0
              this.localData = r.list || []
            }
            this.localLoading = false
            setTimeout(() => {
              this.getHeight()
            }, 100)
          })
          .catch(() => {
            this.localLoading = false
          })
      }
    },
    /**
     * 加载column
     */
    renderColumn(columns, h) {
      if (!columns || !columns.length) {
        return
      }
      let tableColumn = []
      columns.forEach(item => {
        let { scopedSlots } = item
        let column = this.createColumn(item)
        let vNode
        // 插槽存在的话
        if (this.notEmpty(scopedSlots)) {
          column[1] = {
            ...column[1],
            ...this.createScopedSlot(item, h)
          }
          vNode = h(...column)
        } else {
          vNode = h(...column, this.renderColumn(item.children, h))
        }
        tableColumn.push(vNode)
      })
      return tableColumn
    },
    notEmpty(obj) {
      if (typeof obj === 'object' && JSON.stringify(obj) !== '{}') {
        return true
      }
      return false
    },
    createColumn(column) {
      return [
        'el-table-column',
        {
          props: {
            ...this.attributesColumn(column)
          }
        }
      ]
    },
    attributesColumn(column) {
      const attr = [
        'type',
        'label',
        'prop',
        'width',
        'minWidth',
        'showOverflowTooltip',
        'align',
        'fixed',
        'formatter',
        'scopedSlots'
      ]
      let obj = {}
      attr.forEach(prop => {
        // 如果设置了 type=index，可以通过传递 index：Function(index),此项目要求统一就直接在此写格式化函数了
        if (column[prop] == 'index') {
          obj['index'] = index => {
            return (this.currentPage - 1) * this.pageSize + index + 1
          }
        }
        column[prop] && (obj[prop] = column[prop])
      })
      return obj
    },
    createScopedSlot({ scopedSlots }, h) {
      let { customRender } = scopedSlots
      return {
        scopedSlots: {
          default: props => {
            if (customRender && this.$scopedSlots[customRender]) {
              return h(
                'span',
                {
                  style: {}
                },
                this.$scopedSlots[customRender]({
                  row: props['row'],
                  column: props['column'],
                  $index: props['$index']
                })
              )
            }
          }
        }
      }
    },
    /**
     *   渲染pagination
     */
    renderPagination(h) {
      if (this.total <= 0) {
        return
      }
      const {
        // 分页
        currentPage,
        pageSize,
        pageSizes,
        layout,
        total,
        pagerCount,
        background,
        sizeChange,
        currentChange,
        paginationSmall
      } = this
      return h('el-pagination', {
        props: {
          'current-page': currentPage,
          'page-size': pageSize,
          'page-sizes': pageSizes,
          'pager-count': pagerCount,
          background: background,
          total: total,
          layout: layout,
          small: paginationSmall
        },
        on: {
          'size-change': sizeChange,
          'current-change': currentChange
        },
        style: {
          'text-align': 'right',
          'margin-top': '10px'
        }
      })
    },
    //pageSize 改变时会触发
    sizeChange(size) {
      this.pageSize = size //必须手动赋值， render函数 .sync不起作用
      this.currentPage = 1 //赋值为 1
      this.loadData({
        page: this.currentPage,
        limit: size
      })
    },
    //currentPage 改变时会触发
    currentChange(current) {
      this.currentPage = current //必须手动赋值， render函数 .sync不起作用
      this.loadData({
        page: current,
        limit: this.pageSize
      })
    }
  },
  render(h) {
    const props = {}
    const localKeys = Object.keys(this.$data)
    Object.keys(Table.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey]
        return props[k]
      }
      this[k] && (props[k] = this[k])
      return props[k]
    })
    const table = (
      <div class='table-wrapper' style={this.tableStyle} ref='tableWrapper'>
        <el-table
          {...{ props, scopedSlots: { ...this.$scopedSlots } }}
          on-selection-change={selection => {
            this.$emit('selection-change', selection)
          }}
          onSelect={(selection, row) => {
            this.$emit('select', selection, row)
          }}
          on-select-all={selection => {
            this.$emit('select-all', selection)
          }}
          v-loading={this.localLoading}
          element-loading-text='loading...'>
          {this.renderColumn(this.columns, h)}
        </el-table>
        <div class='pagination-wrapper' ref='paginationWrapper'>
          {this.renderPagination(h)}
        </div>
      </div>
    )
    return table
  }
}
