/*
 * @Author: mn
 * @Date: 2022-08-17 15:55:27
 * @LastEditors: mn
 * @LastEditTime: 2022-11-23 09:13:29
 * @Description:
 */

export function columns(that) {
  return [
    {
      width: 50,
      label: '序号',
      type: 'index',
      align: 'center'
    },
    {
      label: '用户',
      prop: 'name',
      align: 'center',
      minWidth: 100,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '使用状态',
      prop: 'status',
      align: 'center',
      minWidth: 100,
      showOverflowTooltip: true,
      scopedSlots: { customRender: 'statusRender' }
    },
    {
      label: '手机号',
      prop: 'phone',
      align: 'center',
      minWidth: 130,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '邮箱',
      prop: 'email',
      align: 'center',
      minWidth: 130,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '描述',
      prop: 'description',
      align: 'center',
      minWidth: 130,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '注册地址',
      prop: 'address',
      align: 'center',
      minWidth: 130,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '注册IP',
      prop: 'ip',
      align: 'center',
      minWidth: 100,
      showOverflowTooltip: true,
      formatter: emptyFmt
    },
    {
      label: '注册时间',
      prop: 'created_at',
      align: 'center',
      minWidth: 120,
      showOverflowTooltip: true,
      formatter: emptyFmt
    }
  ]
}

export function loadData(that) {
  return parameter => {
    const requestParameters = Object.assign({}, parameter, that.queryParams)
    return that.$api
      .getTableData(requestParameters)
      .then(res => {
        if (res.code == 200) {
          return res.data
        } else {
          that.$modal.msgError('mock记录列表获取失败')
          return {
            records: [],
            total: 0
          }
        }
      })
      .catch(() => {})
  }
}
