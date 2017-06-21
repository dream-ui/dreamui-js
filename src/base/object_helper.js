// ////////////////////////////////////////////////////
// ////////////////// 对象相关方法 ////////////////////
// ////////////////////////////////////////////////////

import { ParameterError } from './exceptions'
import { isFunction } from './base.js'

export const propertyScanner = (obj, callback) => {
  if (!isFunction(obj) && typeof obj !== 'object') {
    throw new ParameterError('Parameter obj must be a Object Or Function.')
  }
  if (!isFunction(callback)) {
    throw new ParameterError('Parameter callback must be a Function')
  }
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callback(prop, obj[prop], obj)
    }
    continue
  }
}

export const objectMerge = (...rest) => {
  const originObj = {}
  for (const item of rest) {
    propertyScanner(item, (key, value) => {
      originObj[key] = value
    })
  }
  return originObj
}
