/*
 * @Author: mn
 * @Date: 2022-11-18 16:52:11
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 17:12:48
 * @Description:
 */
import { response } from '@/mock/utils'
import Mock from 'mockjs'

const data = Mock.mock({
  'items|320': [
    {
      'id|+1': 1,
      label: '@word'
    }
  ]
})

export default [
  {
    //  select 选择框的测试
    url: '/mock/getSelectData',
    type: 'get',
    response: config => {
      const { label = '' } = config.query
      let dataSource = data.items.filter(item => {
        return item.label.includes(label)
      })
      return response(config, dataSource)
    }
  }
]
