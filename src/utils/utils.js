import {
  isFunction,
  isNonEmptyString
} from './../types/types.js'

import {
  ParameterError,
  ParameterNonEmptyStringError
} from './../exceptions/OtherErrors.js'

export const log = (...rest) => {
  console.log(...rest)
}

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
