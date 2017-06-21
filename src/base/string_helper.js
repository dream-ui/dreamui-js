import trim from './trim.js'

import {
  ParameterError,
  ParameterNonEmptyStringError
} from './exceptions.js'

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

export const stringSplit = (str, ...rest) => {
  // TODO: rest 全部为分ge符，并按顺序返回
}

// IsMobile --> isMobile
export const pascalToCamel = (str) => {
  if (isNonEmptyString(str)) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile --> IsMobile
export const camelToPascal = (str) => {
  if (isNonEmptyString(str)) {
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile、IsMobile --> is-mobile
export const camelPascalToHyphe = (str) => {
  if (isNonEmptyString(str)) {
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
      if (isNonEmptyString(item)) {
        if (item.length === 1) {
          upperStr += item
        } else {
          if (isNonEmptyString(upperStr)) {
            result += `${upperStr.toLowerCase()}-`
            upperStr = ''
          }
          result += `${item.toLowerCase()}-`
        }
      }
    }
    if (isNonEmptyString(upperStr)) {
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
  if (isNonEmptyString(str)) {
    return str.replace(/-[a-zA-Z0-9]/g, (old) => {
      return old.replace(/^-/, '').toUpperCase()
    })
  }
  throw new ParameterNonEmptyStringError('Parameter str must be non-empty string.')
}
