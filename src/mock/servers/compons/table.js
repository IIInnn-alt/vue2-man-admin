/*
 * @Author: mn
 * @Date: 2022-11-18 16:52:11
 * @LastEditors: mn
 * @LastEditTime: 2022-11-29 11:39:08
 * @Description:
 */
import { response } from '@/mock/utils'
import Mock from 'mockjs'
// 拓展mockjs
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189', '133', '156'] // 手机号前缀，自定义
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  },
  role: function () {
    var roles = ['admin', 'editor', 'test'] // 角色名称，自定义
    return this.pick(roles) //Number()
  }
})
// console.log(Mock.Random.phone())
// // 生成 1 - 10 个 随机手机号码
// let { phone } = Mock.mock({
//   'phone|1-10': ['@phone']
// })
const data = Mock.mock({
  'items|45': [
    {
      'id|+1': 1,
      name: '@cname',
      description: '@cparagraph(1)',
      status: '@boolean',
      created_at: '@date',
      email: '@email',
      phone: '@phone',
      address: '@city(true)',
      role: '@role',
      ip: '@ip'
    }
  ]
})

function roleDataFun(total = 1) {
  let arr = []
  for (let i = 0; i < total; i++) {
    arr.push({
      id: i + 1,
      name: ['admin', 'editor', 'test'][i],
      created_at: Mock.Random.date()
    })
  }
  return arr
}
const roleData = roleDataFun(3)

export default [
  {
    //  多个用户信息
    url: '/mock/getTableData',
    type: 'get',
    response: config => {
      const { username = '' } = config.query
      let dataSource = data.items.filter(item => {
        return item.name.includes(username)
      })
      return response(config, dataSource)
    }
  },
  {
    // 角色列表
    url: '/mock/getRoleData',
    type: 'get',
    response: config => {
      return response(config, roleData)
    }
  }
]
