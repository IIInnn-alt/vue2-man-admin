/*
 * @Author: mn
 * @Date: 2022-07-14 10:28:09
 * @LastEditors: mn
 * @LastEditTime: 2023-05-05 13:54:03
 * @Description: 数据处理
 */

/**
 *  将数组 转换成树形结构
 * @param {*} list 需要转换的数组 例: [{id:1,pid:0,name:'一级'},{id:2,pid:1,name:'一级1'},{id:3,pid:1,name:'一级2'},{id:4,pid:2,name:'一级1-1'}]
 * @param {*} id id编号 例: “unid”
 * @param {*} pid 父级id  例: “pid”
 * @param {*} children  子级存放位置  例: “children”
 * return 树形结构
 */
export function toTreeData(list = [], id, pid, children) {
  const result = []
  if (!Array.isArray(list)) {
    return result
  }
  const data = [...list]
  const map = {}
  data.forEach(item => {
    if (!item[pid]) {
      item['treeLevel'] = 1
    }
    delete item[children]
    map[item[id]] = item
  })
  data.forEach(item => {
    const parent = map[item[pid]]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
export function arrayToTree(list = [], id, pid, children) {
  const result = []
  if (!Array.isArray(list)) {
    return result
  }
  const data = [...list]
  const objectMap = data.reduce((calcData, el) => {
    calcData[el.id] = el
    return calcData
    // calcData[el.id] = el;
  }, {})
  data.forEach(item => {
    if (!objectMap[item.pid]) {
      objectMap[item.id]['treeLevel'] = 1
      result.push(objectMap[item.id])
    } else {
      ;(objectMap[item.pid].children || (objectMap[item.pid].children = [])).push(objectMap[item.id])
    }
  })
  return result
}

/**
 * 将对象数组 排序
 * @param {*} list
 * @param {*} inxv
 *  @param {*} type  1 从小到大  2 从大到小
 */
export function arrObjSort(list = [], inx, type = 1) {
  const data = [...list]
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }
  const compare = function (obj1, obj2) {
    const val1 = obj1[inx]
    const val2 = obj2[inx]
    if (type == 1) {
      if (val1 < val2) {
        return -1
      } else if (val1 > val2) {
        return 1
      } else {
        return 0
      }
    } else if (type == 2) {
      if (val1 > val2) {
        return -1
      } else if (val1 < val2) {
        return 1
      } else {
        return 0
      }
    }
  }
  return data.sort(compare)
}

/**
 * @description: 数组合并去重  根据
 */
export function mergeArray(arr1, arr2) {
  var _arr = new Array()
  for (var i = 0; i < arr1.length; i++) {
    _arr.push(arr1[i])
  }
  for (var i = 0; i < arr2.length; i++) {
    var flag = true
    for (var j = 0; j < arr1.length; j++) {
      if (arr2[i] == arr1[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      _arr.push(arr2[i])
    }
  }
  return _arr
}

/**
 * @description: 根据 aid 找出对应的数据 返回数组
 * @param {*} dataSource 源数据
 * @param {*} aid
 */
export function filterDataToArray(dataSource = [], aid) {
  let result = []
  if (!Array.isArray(dataSource)) {
    return result
  }
  for (const item of dataSource) {
    if (item.id == aid) {
      result.push(item)
      return result
    } else {
      if (item.children && item.children.length) {
        return filterDataToArray(item.children, aid)
      }
    }
  }
}
/**
 * @description: 根据 aid 找出对应的数据 返回项
 * @param {*} dataSource 源数据
 * @param {*} key
 */
export function filterData(dataSource = [], aid) {
  for (const item of dataSource) {
    if (item.id == aid) {
      return item
    } else {
      if (item.children && item.children.length) {
        let res = filterData(item.children, aid)
        if (res) {
          return res
        }
      }
    }
  }
  return null
}

/**
 * @description: 根据搜索条件查询树形结构数据  返回上下级 结构
 * @param {*} value 单个搜索条件
 * @param {*} arr  源数据
 * @param {*} key  条件key
 */
export function searchTree(value, arr, key) {
  let newarr = []
  arr.forEach(element => {
    if (element[key].indexOf(value) > -1) {
      // 判断条件
      newarr.push(element)
    } else {
      if (element.children && element.children.length > 0) {
        let redata = searchTree(value, element.children, key)
        if (redata && redata.length > 0) {
          let obj = {
            ...element,
            children: redata
          }
          newarr.push(obj)
        }
      }
    }
  })
  return newarr
}
