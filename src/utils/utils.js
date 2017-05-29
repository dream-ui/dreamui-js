import {
  isFunction,
  isNonEmptyString
} from './../types/types.js'

import {
  ParameterError,
  ParameterNonEmptyStringError
} from './../exceptions/OtherErrors.js'

const log = (...rest) => {
  console.log(...rest)
}

const propertyScanner = (obj, callback) => {
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
const pascalToCamel = (str) => {
  if (isNonEmptyString(str)) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile --> IsMobile
const camelToPascal = (str) => {
  if (isNonEmptyString(str)) {
    return str.substring(0, 1).toLowerCase() + str.substring(1)
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// isMobile、IsMobile --> is-mobile
const camelPascalToHyphe = (str) => {
  if (isNonEmptyString(str)) {
    if (str.search(/[^a-zA-Z]/) !== -1) {
      throw new ParameterError('Parameter str must make up of letters.')
    }
    let result = ''
    let upperStr = ''
    const matchs = str.match(new RegExp('([A-Z][a-z]*|[A-Z]*)', 'g'))
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
    return result.replace(/-$/g, '')
  }
  throw new ParameterError('Parameter str must be string and not empty.')
}

// is-mobile --> IsMobile

const hypheToPascal = (str) => {
  return hypheToCamel(str).replace(/^([a-z])/g, function (value) { return value.toUpperCase() })
}

// is-mobile --> isMobile
const hypheToCamel = (str) => {
  if (isNonEmptyString(str)) {
    return str.replace(/-[a-zA-Z0-9]/g, (old) => {
      return old.replace(/^-/, '').toUpperCase()
    })
  }
  throw new ParameterNonEmptyStringError('Parameter str must be non-empty string.')
}

module.exports = {
  log,
  propertyScanner,
  pascalToCamel,
  camelToPascal,
  camelPascalToHyphe,
  hypheToCamel,
  hypheToPascal
}
