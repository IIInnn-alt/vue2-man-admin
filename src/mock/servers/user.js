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
      id: '@id()',
      name: '@cname',
      description: '@cparagraph',
      status: '@boolean',
      created_at: '@datetime',
      email: '@email',
      phone: '@phone',
      address: '@province',
      role: '@role',
      ip: '@ip'
    }
  ]
})
//  写增删改查
export default [
  // 获取列表
  {
    url: '/user/userlist',
    type: 'get',
    response: config => {
      // console.log(config,'configconfig'); // 参数传过来的 请求体 ， 格式为 对象格式
      const items = data.items // 获取值
      const {
        name = config.body.name,
        pageNumber = config.body.pageNumber,
        pageSize = config.body.pageSize
      } = config.query
      const mockList = items.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false // name 作为查询的条件
        return true
      })
      const pageList = mockList.filter(
        (item, index) => index < pageSize * pageNumber && index >= pageSize * (pageNumber - 1)
      )

      return {
        status: 200, //这个根据 request.js 请求响应配置的
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  },
  // 创建or编辑
  {
    url: '/user/createuser',
    type: 'post',
    response: config => {
      let obj = config.body
      if (obj.id) {
        data.items.some(u => {
          if (u.id === obj.id) {
            u.name = obj.name
            u.description = obj.description
            u.status = obj.status
            u.email = obj.email
            u.phone = obj.phone
            u.address = obj.address
            u.role = obj.role
            return true
          }
        })
        return {
          status: 200,
          message: '修改成功'
        }
      } else {
        obj.id = Mock.Random.id()
        obj.created_at = Mock.mock('@now')
        data.items.unshift(obj)
        return {
          status: 200,
          message: '添加成功'
        }
      }
    }
  },
  // 删除
  {
    url: '/user/deluser',
    type: 'post',
    response: config => {
      let obj = config.body
      if (!obj.id) {
        return {
          status: 2005,
          message: '参数不正确'
        }
      } else {
        data.items = data.items.filter(u => u.id !== obj.id)
        return {
          status: 200,
          message: '删除成功'
        }
      }
    }
  },
  // 批量删除
  {
    url: '/user/batchremove/users',
    type: 'post',
    response: config => {
      let str = config.body.idStr
      let arr = str.split(',')
      data.items = data.items.filter(u => !arr.includes(u.id))
      return {
        status: 200,
        message: '批量删除成功'
      }
    }
  }
]
