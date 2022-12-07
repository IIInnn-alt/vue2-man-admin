/*
 * @Author: mn
 * @Date: 2022-08-18 15:10:43
 * @LastEditors: mn
 * @LastEditTime: 2022-11-23 13:08:10
 * @Description:  table表格的公共 方法、属性、值  局部引入，不建议全局引入
 */

export default {
  data() {
    return {
      queryParams: {},
      dialogTitle: '新增',
      dialogVisible: false,
      addData: {},
      selectionRows: [] //e-table selection-change选中的值
    }
  },
  methods: {
    /* e-table 选择操作  需要定义      @selection-change="handleSelectionChange"*/
    handleSelectionChange(val) {
      this.selectionRows = val
    },

    /**
     * @description:  通用重置按钮操作 , vue中 可重写这个方法
     * @param {* String} queryObj  需要置空的 查询对象名
     * @param {* String} refName   实例对象名
     */
    resetQuery() {
      this.queryParams = {}
      this.$refs.table.refresh(true)
    },
    /**
     * @description:
     * @param {*} name 新增的弹窗名字
     * @param {*} addObject  新增时需要传过去的数据 默认 {}
     */
    mixinAdd(name, addObject = {}) {
      this.dialogTitle = '新增' + name
      this.addData = { ...addObject }
      this.dialogVisible = true
    },
    /**
     * @description: 通用 编辑按钮
     * @param {*} apiName 接口名称 必填
     * @param {*} params 自定义参数
     * @param {*} tip 提示
     * @param {*} key
     */
    mixinEdit({ apiName, params = null, tip, key = 'id' }) {
      let editParams = { id: (this.selectionRows.length && this.selectionRows[0][key]) || null }
      if (params != null) {
        editParams = params
      }
      this.$api[apiName](editParams).then(res => {
        if (res.code == 200) {
          this.addData = res.data
          this.dialogTitle = `编辑${tip}`
          this.dialogVisible = true
        } else {
          this.$message.error(`${tip}信息获取失败`)
        }
      })
    },
    /**
     * @description: object 对象
     * @param {*} apiName   接口名称 必填
     * @param {*} params   自定义的参数
     * @param {*} tip  提示
     * @param {*} type  0 是单删  1是批量删除
     * @param {*} key  删除的key字段
     */
    mixinDelete({ apiName, tip, params = null, type = 0, key = 'id' }) {
      let deleteParams = null
      if (params != null) {
        deleteParams = params
      } else {
        if (type == 1) {
          deleteParams = []
          this.selectionRows.forEach(item => {
            deleteParams.push(item[key])
          })
        } else {
          deleteParams = { id: this.selectionRows[0][key] }
        }
      }
      this.$modal
        .confirm(`此操作将永久删除该${tip}信息, 是否继续?`)
        .then(() => {
          this.$api[apiName](deleteParams).then(res => {
            if (res.code == 200) {
              this.$refs.table.refresh(true)
              this.$message.success(`删除${tip}成功`)
              this.selectionRows = [] //清空选项
            } else {
              this.$message.error(res.msg || `删除${tip}失败`)
            }
          })
        })
        .catch(() => {})
    },
    /**
     * @description:
     * @param {*} apiName 接口名
     * @param {*} params  对象参数  默认 this.queryParams
     * @param {*} tip 提示名称
     */
    mixinExport({ apiName, params = {}, tip }) {
      this.$modal
        .confirm(`是否导出${tip}?`)
        .then(() => {
          this.$api[apiName]({ ...this.queryParams, ...params }).then(res => {
            if (res && res.size == 0) {
              this.$message.error('内容为空，无法下载')
              return
            } else {
              this.downData(res, tip)
              setTimeout(() => {
                this.$message.success(`导出${tip}成功`)
              }, 600)
            }
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 校验表单
     * @param {*} refName
     * @param {*} refName1
     */
    mixinCheck(refName = 'add', refName1 = 'addForm') {
      return new Promise((resolve, reject) => {
        this.$refs[refName].$refs[refName1].validate(valid => {
          if (valid) {
            resolve()
          }
        })
      })
    },
    /**
     * @description: 新增或者修改    判断是否 新增和编辑 默认为id
     * @param {*} refName  父级refs名
     * @param {*} refName1  子refs名
     * @param {*} updateName  编辑接口名  必填
     * @param {*} addName   新增接口名  必填
     * @param {*} tip  提示
     * @param {*} keyName   新增和编辑判断依据名
     */
    mixinData({ refName = 'add', refName1 = 'addForm', updateName, addName, tip, keyName = 'id' }) {
      this.$refs[refName].$refs[refName1].validate(valid => {
        if (valid) {
          const formData = this.$refs[refName].form
          if (formData[keyName] != undefined) {
            //编辑
            this.$api[updateName](formData).then(res => {
              if (res.code == 200) {
                this.$message.success(`${tip}编辑成功`)
                this.$refs.table.refresh(true)
                this.dialogVisible = false
                this.selectionRows = [] //清空选项
              } else {
                this.$message.error(res.msg || `${tip}编辑失败`)
              }
            })
          } else {
            //新增
            this.$api[addName](formData).then(res => {
              if (res.code == 200) {
                this.$message.success(`${tip}新增成功`)
                this.$refs.table.refresh(true)
                this.dialogVisible = false
              } else {
                this.$message.error(res.msg || `${tip}新增失败`)
              }
            })
          }
        }
      })
    }
  }
}
