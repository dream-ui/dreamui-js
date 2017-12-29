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
export const {
  isWeChat,
  isQQ,
  copyText
} = require('./src/broswer/broswer')

export const {
  setLocalStorage,
  getLocalStorage,
  initLocalStorage
} = require('./src/broswer/localStorage')

export const {
  getParam,
  hasParam,
  addParam,
  addParams,
  parseUrl
} = require('./src/broswer/Url')

export const {
  bindEvent,
  unBindEvent,
  bindOnce,
  transitionEnd,
  hasClass,
  addClass,
  removeClass,
  createDom,
  getStyle,
  setStyle
} = require('./src/broswer/dom/Dom')

// const broswer = require('./broswer/broswer')
export const PubSub = require('./src/event/event')

export const {
  compareVersion,
  toThousandBit,
  pascalToCamel,
  camelToPascal,
  camelPascalToHyphe,
  hypheToPascal,
  hypheToCamel
} = require('./src/base/index')

export default {
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
    dom: {
      bindEvent,
      unBindEvent,
      bindOnce,
      transitionEnd,
      hasClass,
      addClass,
      removeClass,
      createDom,
      getStyle,
      setStyle
    }
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
