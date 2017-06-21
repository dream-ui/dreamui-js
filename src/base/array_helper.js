// ////////////////////////////////////////////////////
// ////////////////// 数组相关方法 //////////////////////
// ////////////////////////////////////////////////////

const { isFunction } = require('./object_helper')

/**
 * 判断是否是数组
 * @param {*} arr - 要检测的值
 * @return {Boolean} result
 */
export const isArray = (arr) => {
  return typeof arr === 'object' && arr instanceof Array
}

export const isNonEmptyArray = (arr) => {
  return typeof arr === 'object' && arr instanceof Array && arr.length > 0
}

/**
 * 判断两个数组的内容是否相同
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean} result
 */
export const arrayEqual = (arr1, arr2) => {
  if (isArray(arr1) && isArray(arr2)) {
    if (arr1.length === arr2.length) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }
  }
  return false
}

export const arrayContains = (arr, obj) => {
  if (isNonEmptyArray(arr)) {
    if (isFunction(arr.contains)) {
      return arr.contains(obj)
    }
    for (const item of arr) {
      if (item === obj) return true
    }
  }
  return false
}

export const arrayLikeContains = (arr, obj) => {
  if (typeof arr === 'object' && arr.length > 0) {
    if (isFunction(arr.contains)) {
      return arr.contains(obj)
    }
    for (const item of arr) {
      if (item === obj) return true
    }
  }
  return false
}

/**
 * 依据索引删除数组中的某个元素
 * @param {Array} arr - 源数组
 * @param {Number} idx - 要删除的元素索引
 * @return {Array} 删除指定索引处元素后的新数组
 */
export const arrayRemoveIndex = (arr, idx) => {
  if (isArray(arr) && idx >= 0) {
    return arr.slice(0, idx).concat(arr.slice(idx + 1))
  } else {
    return arr
  }
}

/**
 * 删除数组中的某个元素
 * @param {Array} arr - 源数组
 * @param {*} obj - 要删除的元素
 * @return {Array} 删除指定元素后的新数组
 */
export const arrayRemoveObject = (arr, obj) => {
  if (!isArray(arr)) {
    return
  }
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx] === obj) {
      return arrayRemoveIndex(arr, idx)
    }
  }
  return arr
}

/**
 * 数组差集
 *  以 arry1 为基础，去除 arry2 中包含的元素，并返回一个新的数组
 *  若 arry1 无改动, 则直接返回 arry1
 * @param {array} arry1
 * @param {array} arry2
 * @return {array} - result 返回一个全新的数组
 */
export const arrayRemoveRepeat = (arry1, arry2) => {
  let oldArray = arry1
  if (isArray(oldArray) && isArray(arry2)) {
    for (const item of arry2) {
      oldArray = arrayRemoveObject(oldArray, item)
    }
  }
  return oldArray
}
