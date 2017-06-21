export const {
  isArray,
  arrayEqual,
  arrayContains,
  arrayLikeContains,
  arrayRemoveIndex,
  arrayRemoveObject,
  arrayRemoveRepeat
} = require('./array_helper')

export const {
  compareVersion,
  toThousandBit,
  isFalse,
  isTrue,
  log,
  isFunction
} = require('./base')

export const {
  propertyScanner,
  objectMerge
} = require('./object_helper')

export const trim = require('./trim')

export const {
  isEmptyString,
  notEmptyString,
  stringSplit,
  pascalToCamel,
  camelToPascal,
  camelPascalToHyphe,
  hypheToPascal,
  hypheToCamel
} = require('./string_helper')

export const {
  CommonError,
  ClassNameError,
  ParameterError,
  ParameterHTMLElementError,
  ParameterNonEmptyStringError,
  TopicEmptyError
} = require('./exceptions')
