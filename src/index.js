/**
 * @author borenXue
 * @homesite http://www.xueboren.com
 * @email boren.xue@outlook.com
 * @date 2017-05-26 02:55:49
 * @desc tools_js: 工具函数、常用算法 实现
 */

/**
 * Broswer Module
 */
const {
  isWeChat,
  isQQ,
  copyText
} = require('./broswer/broswer')

const {
  getParam,
  hasParam,
  addParam,
  addParams,
  parseUrl
} = require('./broswer/Url')

const dom = require('./broswer/dom/Dom')

// const broswer = require('./broswer/broswer')
const PubSub = require('./event/event')

const {
  compareVersion,
  toThousandBit,
  pascalToCamel,
  camelToPascal,
  camelPascalToHyphe,
  hypheToPascal,
  hypheToCamel
} = require('./base/index')

module.exports = {
  broswer: {
    isWeChat,
    isQQ,
    copyText,
    URL: {
      getParam,
      hasParam,
      addParam,
      addParams,
      parseUrl
    },
    dom
  },
  PubSub,
  nameStyle: {
    pascalToCamel,
    camelToPascal,
    camelPascalToHyphe,
    hypheToPascal,
    hypheToCamel
  },

  /**
   * Global Functions
   */
  compareVersion,
  toThousandBit
}
