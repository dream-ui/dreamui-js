
const isFunction = (func) => {
  return func && typeof func === 'function'
}

const isNotBlankString = (str) => {
  return str && typeof str === 'string' && str.trim && str.trim() !== ''
}

const isTrue = (boo) => {
  return boo === true
}

const isFalse = (boo) => {
  return boo === false
}

const isArray = (arr) => {
  return arr && arr instanceof Array
}

// ////////////////////////////////////////////////////
// ////////////////// 数组相关方法 //////////////////////
// ////////////////////////////////////////////////////

const arrayRemoveIndex = (arr, idx) => {
  if (isArray(arr) && idx >= 0) {
    return arr.slice(0, idx).concat(arr.slice(idx + 1))
  } else {
    return arr
  }
}

const arrayRemoveObject = (arr, obj) => {
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
 * 数组去重
 *  以 arry1 为基础，去除 arry2 中包含的元素，并返回一个新的数组
 *  若 arry1 无改动, 则直接返回 arry1
 * @param {array} arry1
 * @param {array} arry2
 * @return 返回一个全新的数组
 */
const arrayRemoveRepeat = (arry1, arry2) => {
  let oldArray = arry1
  if (isArray(oldArray) && isArray(arry2)) {
    for (const item of arry2) {
      oldArray = arrayRemoveObject(oldArray, item)
    }
  }
  return arry1
}

module.exports = {
  isFunction,
  isNotBlankString,
  isTrue,
  isFalse,
  isArray,
  arrayRemoveIndex,
  arrayRemoveObject,
  arrayRemoveRepeat
}
