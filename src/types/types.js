import trim from './../utils/trim'
import { propertyScanner } from './../utils/utils'

/**
 * 判断是否是函数
 * @param {*} func - 要检测的值
 * @return {Boolean} result
 */
export const isFunction = (func) => {
  return typeof func === 'function'
}

/**
 * 判断是否是空字符串
 * @param {*} str - 要检测的值
 * @return {Boolean} result
 */
export const isEmptyString = (str) => {
  return typeof str === 'string' && trim(str) === ''
}

export const isNonEmptyString = (str) => {
  return typeof str === 'string' && trim(str) !== ''
}

/**
 * 判断是否是 true
 * @param {*} boo - 要检测的值
 * @return {Boolean} result
 */
export const isTrue = (boo) => {
  return boo === true
}

/**
 * 判断是否是 false
 * @param {*} boo - 要检测的值
 * @return {Boolean} result
 */
export const isFalse = (boo) => {
  return boo === false
}

/**
 * 判断是否是数组
 * @param {*} arr - 要检测的值
 * @return {Boolean} result
 */
export const isArray = (arr) => {
  return typeof arr === 'object' && arr instanceof Array
}

// ////////////////////////////////////////////////////
// ////////////////// 对象相关方法 ////////////////////
// ////////////////////////////////////////////////////

export const objectMerge = (...rest) => {
  const originObj = {}
  for (const item of rest) {
    propertyScanner(item, (key, value) => {
      originObj[key] = value
    })
  }
  return originObj
}

// ////////////////////////////////////////////////////
// ////////////////// 字符串相关方法 ////////////////////
// ////////////////////////////////////////////////////

export const stringSplit = (str, ...rest) => {
  // TODO: rest 全部为分ge符，并按顺序返回
}

// ////////////////////////////////////////////////////
// ////////////////// 数组相关方法 //////////////////////
// ////////////////////////////////////////////////////

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

// module.exports = {
//   isFunction,
//   isBlankString,
//   isTrue,
//   isFalse,
//   isArray,
//   arrayEqual,
//   arrayRemoveIndex,
//   arrayRemoveObject,
//   arrayRemoveRepeat
// }
