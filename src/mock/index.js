/*
 * @Author: mn
 * @Date: 2022-07-12 11:30:51
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 16:10:35
 * @Description: mock
 *  npm install mockjs -D  开发依赖
 */
// see  https://github.com/nuysoft/Mock/wiki
import Mock from 'mockjs'
import { param2Obj } from './utils'
var Random = Mock.Random

// 自动获取
const files = require.context('./servers', true, /\.js$/)
const mocks = []
files.keys().forEach(fileName => {
  mocks.push(...files(fileName).default)
})
//可扩展
Random.extend({
  constellation: function (date) {
    var constellations = [
      '白羊座',
      '金牛座',
      '双子座',
      '巨蟹座',
      '狮子座',
      '处女座',
      '天秤座',
      '天蝎座',
      '射手座',
      '摩羯座',
      '水瓶座',
      '双鱼座'
    ]
    return this.pick(constellations)
  }
})
console.log(
  Random.email(),
  '----------------' + '\n',
  Random.string(8),
  '---------------' + '\n',
  Random.constellation(),
  '---------------' + '\n'
)

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    if (this.custom.requestHeaders) {
      this.custom.options.headers = this.custom.requestHeaders
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url, headers } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
          headers: headers
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }
  //see http://mockjs.com/0.1/#mock
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
// const responseFake = (url, type, respond) => {
//   return {
//     url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
//     type: type || 'get',
//     response(req, res) {
//       console.log('request invoke:' + req.path)
//       res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
//     }
//   }
// }

// export default mocks.map(route => {
//   return responseFake(route.url, route.type, route.response)
// })
