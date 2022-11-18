import Mock from 'mockjs'
import loginData from '../serversData/loginUser'
const userData = loginData.userData //用户信息
const roleData = loginData.roleData //角色信息
const code = Mock.mock(/[a-z]{2}[0-9]{2}[A-Z]{2}/) //生成随机6位，有小写  数字 大写
import { validAuth, validToken } from '../utils'
export default [
  {
    //  获取验证码
    url: '/getCheckCode',
    type: 'get',
    response: config => {
      validAuth(config.headers.Authorization)
      return {
        code: 200, //这个根据 request.js 请求响应返回来  配置的
        message: '验证码已发送，验证码:' + code,
        checkCode: code
      }
    }
  },
  {
    //登录
    url: '/login',
    type: 'post',
    response: config => {
      validAuth(config.headers.Authorization)
      let userlist = {}
      let data = config.body
      if (data.checkCode == code) {
        var isLogin = userData.map(res => {
          if (data.username == res.username && data.password == res.password) {
            //验证登录用户名和密码 是否存在于  userData里，存在即可成功登录
            userlist.id = res.id
            userlist.username = res.username
            userlist.access_token = res.access_token
            userlist.refresh_token = res.refresh_token
            return true
          } else {
            return false
          }
        })
        if (isLogin.includes(true)) {
          // 如果isLogin里有一个true 就暴露出去（因为这里没有判重，用户和密码可能多次存在）
          return {
            code: 200,
            message: '登录成功',
            data: userlist
          }
        } else {
          return {
            code: 2001, // 账户名或者密码错误
            message: '用户名或者密码错误,请重新输入',
            data: null
          }
        }
      } else {
        return {
          code: 2002, // 验证码 失效
          message: '验证码失败，请重新验证',
          data: null
        }
      }
    }
  },
  {
    //获取用户信息  role  权限之类的  列表,根据 token
    url: '/userinfo',
    type: 'get',
    response: config => {
      validToken(config.headers.Authorization)
      // get请求的参数在query里面
      let userInfo = {}
      // 验证token，并根据token解析获取对应的用户信息
      var istoken = userData.map(res => {
        if ('bearer ' + res.access_token == config.headers.Authorization) {
          userInfo = res
          return true
        } else {
          return false
        }
      })
      if (istoken) {
        return {
          code: 200,
          message: 'success',
          data: userInfo
        }
      } else {
        return {
          code: 2003,
          message: 'token验证失败,请重新登录',
          data: {}
        }
      }
    }
  },
  {
    //获取role列表
    url: '/rolelist',
    type: 'get',
    response: config => {
      validToken(config.headers.Authorization)
      const name = config.query.rolename
      const pageNumber = config.query.pageNumber
      const pageSize = config.query.pageSize
      const mockList = roleData.filter(user => {
        if (name && user.name.indexOf(name) === -1) return false // rolename 作为查询的条件
        return true
      })
      const pageList = mockList.filter(
        (item, index) => index < pageSize * pageNumber && index >= pageSize * (pageNumber - 1)
      )
      return {
        code: 200, //这个根据 request.js 请求响应配置的
        data: {
          total: mockList.length,
          data: pageList
        }
      }
    }
  }
]
