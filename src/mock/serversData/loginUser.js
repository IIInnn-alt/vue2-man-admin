/*
 * @Author: mn
 * @Date: 2022-07-12 14:48:07
 * @LastEditors: mn
 * @LastEditTime: 2022-10-27 09:22:52
 * @Description:
 */
//信息管理
export default {
  // 0213711d8b8773c12c52eaf8b4da9dc479a6f33c

  userData: [
    {
      id: '1',
      username: 'admin',
      realname: '管理员',
      phone: '18888888888',
      address: '江苏省南京市',
      password: '123456', // 手动加密后的密码
      roles: ['admin'],
      imgHead: 'https://i.loli.net/2021/03/17/8NlLIaoQbyO4R6t.jpg',
      access_token: 'admin123abcdefghijklmn', //手写生成的
      refresh_token: 'admin456opqrstuvwxyz' //手写生成的
    },
    {
      id: '2',
      username: 'editor',
      realName: '编辑者',
      phone: '18888888888',
      address: '江苏省南京市',
      password: '123456', // 手动加密后的密码
      roles: ['editor'],
      imgHead: 'https://i.loli.net/2021/03/17/8NlLIaoQbyO4R6t.jpg',
      access_token: 'editor123abcdefghijklmn', //手写生成的
      refresh_token: 'editor456opqrstuvwxyz' //手写生成的
    },
    {
      id: '3',
      username: 'test',
      realName: '测试',
      phone: '18888888888',
      address: '江苏省南京市',
      password: '123456', // 手动加密后的密码
      roles: ['test'],
      imgHead: 'https://i.loli.net/2021/03/17/8NlLIaoQbyO4R6t.jpg',
      access_token: 'test123abcdefghijklmn', //手写生成的
      refresh_token: 'test456opqrstuvwxyz' //手写生成的
    }
  ],
  roleData: [
    {
      id: '1',
      name: 'admin',
      createdTime: '2021/04/15'
    },
    {
      id: '2',
      name: 'editor',
      createdTime: '2021/04/15'
    },
    {
      id: '3',
      name: 'test',
      createdTime: '2021/04/15'
    }
  ]
}
