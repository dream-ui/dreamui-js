import trim from './trim.js'

import {
  ParameterError,
  ParameterNonEmptyStringError
} from './exceptions.js'

/**
 * 判断是否是空字符串
 * @param {*} str - The value need to detect.
 * @param {Boolean} strict - To enable the strict mode.
 * @return {Boolean} result
 */
export const isEmptyString = (str, strict) => {
  const rStrict = typeof str === 'string' && trim(str) === ''
  return strict ? rStrict : rStrict || !str
}

export const notEmptyString = (str) => {
  return typeof str === 'string' && !isEmptyString(str, true)
}

export const stringSplit = (str, ...rest) => {
  // TODO: rest 全部为分ge符，并按顺序返回
}

/**
 * 命名规则:
 *  Pascal Case: 帕斯卡命名法, 又名大驼峰命名法
 *    eg: IsMobile
 *  Camel Case:  驼峰命名法, 又名小驼峰命名法
 *    eg: isMobile
 *  Hyphe Case: 菌丝命名法
 *    eg: is-mobile
 */

/**
 * 帕斯卡命名字符串 转换为 小驼峰命名
 *  eg: IsMobile --> isMobile
 * @param {string} str
 * @return {string}
 */
export const pascalToCamel = (str) => {
  if (!isEmptyString(str)) {
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile --> IsMobile
/**
 * 小驼峰命名字符串 转换为 帕斯卡命名法
 *  eg: isMobile --> IsMobile
 * @param {string} str
 * @return {string}
 */
export const camelToPascal = (str) => {
  if (!isEmptyString(str)) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile、IsMobile --> is-mobile
export const camelPascalToHyphe = (str) => {
  if (!isEmptyString(str)) {
    if (new RegExp('^[a-z]+(-[a-z]+)*[\\-]?$').test(str)) {
      return str
    }
    if (str.search(/[^a-zA-Z0-9]/) !== -1) { // TODO: 顺序控制
      throw new ParameterError('Parameter str must make up of letters.')
    }
    let result = ''
    let upperStr = ''
    const matchs = str.match(new RegExp('([A-Za-z][a-z0-9]*|[A-Za-z]*)', 'g'))
    for (const item of matchs) {
      if (!isEmptyString(item)) {
        if (item.length === 1) {
          upperStr += item
        } else {
          if (!isEmptyString(upperStr)) {
            result += `${upperStr.toLowerCase()}-`
            upperStr = ''
          }
          result += `${item.toLowerCase()}-`
        }
      }
    }
    if (!isEmptyString(upperStr)) {
      result += `${upperStr.toLowerCase()}-`
      upperStr = ''
    }
    return result.replace(/-$/g, '')
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// is-mobile --> IsMobile
export const hypheToPascal = (str) => {
  return hypheToCamel(str).replace(/^([a-z])/g, function (value) { return value.toUpperCase() })
}

// is-mobile --> isMobile
export const hypheToCamel = (str) => {
  if (!isEmptyString(str)) {
    return str.replace(/-[a-zA-Z0-9]/g, (old) => {
      return old.replace(/^-/, '').toUpperCase()
    })
  }
  throw new ParameterNonEmptyStringError('Parameter str must be non-empty string.')
}
