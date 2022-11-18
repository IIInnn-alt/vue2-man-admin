/*
 * @Author: mn
 * @Date: 2022-07-19 17:29:03
 * @LastEditors: mn
 * @LastEditTime: 2022-11-07 11:34:01
 * @Description:  base64、img、formData、等相互转换
 */
/**
 *  图片转base64
 * @param {*} imageUrl  图片地址 可以为本地获取线上
 */
export function imageUrlToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    //一定要设置为let，不然图片不显示
    let image = new Image()
    //解决跨域问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = imageUrl
    //image.onload为异步加载
    image.onload = () => {
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      var context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)

      var quality = 0.8
      //这里的dataurl就是base64类型
      var dataURL = canvas.toDataURL('image/jpeg', quality) //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
      resolve(dataURL)
    }
  })
}

/**
 * @description: base64代码 转 blob
 * @param {*} code
 */
export function base64ToBlob(code) {
  let parts = code.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let rawLength = raw.length

  let uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

/**
 * @description: 将图片转为 file格式，可以被添加为 formData 供文件上传
 * @param {*} url 地址  可以为图片、文件   对应的type需要更改
 */
export function urlToFile(url) {
  return new Promise((resolve, reject) => {
    window.URL = window.URL || window.webkitURL
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status == 200) {
        //得到一个blob对象
        const blob = xhr.response
        // 类型根据实际项目改变
        var file = new File([blob], 'default.jpg', {
          type: 'image/jpeg',
          lastModified: Date.now()
        })
        resolve(file)
        // let formData = new FormData()
        // formData.append('file', file)
        // this.$api.uploadFile(formData).then(res => {
        //   resolve(res.data)
        // })
      }
    }
    xhr.send()
  })
}

/**
 * @description:  提供 本地文件下载 默认格式为 excel
 * @param {*} fileUrl  文件路径
 * @param {*} fileName  文件名称
 */
export function downDefaultFile(fileUrl, fileName) {
  const bloc = dataURLtoBlob(fileUrl)
  const blob = new Blob([bloc], {
    type: 'application/vnd.ms-excel'
  })
  const downLoadEle = document.createElement('a')
  // 通过返回的二进制数据来创建一个对象URL.
  const href = URL.createObjectURL(blob)
  downLoadEle.style.display = 'none'
  downLoadEle.href = href
  // 信息表为自定义文件名
  downLoadEle.download = fileName
  document.body.appendChild(downLoadEle)
  downLoadEle.click()
  document.body.removeChild(downLoadEle)
  // 当加载完成后释放对象URL.
  window.URL.revokeObjectURL(href)
  // window.open(fileurl, '_blank')
}
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}
