import {
  isNonEmptyString,
  isArray,
  isFunction,
  isEmptyString,
  objectMerge
} from './../types/types.js'

import {
  ParameterError
} from './../exceptions/OtherErrors.js'

import {
  propertyScanner,
  camelPascalToHyphe
} from './../utils/utils.js'

/**
 * @typedef {Object} CreateDomConfig
 * @property {string} tag - 元素标签名 eg: 'div'、'table'
 * @property {?string} content - 元素子文本
 * @property {?CreateDomConfig|?Array<CreateDomConfig>} - 子元素
 * @property {?Object} datas - 元素 dataset 对象, key is Camel-case style, eg: isMobile.
 * @property {?Object} attrs - 元素的属性 attribute, key is Camel-case style, eg: isMobile.
 */

// TODO: analyci cfg.tag: div.class-name#id[attr1][attr2=value2]{{}}
export const strToConfig = (str) => {
  if (!isNonEmptyString(str)) {
    throw new ParameterError('Parameter str must be string and not is empty.')
  }

  // TODO: 含有 + 且不含 > 为非法

  if (str.search(/[^a-zA-Z]/g) === -1) {
    return { tag: str }
  }

  const datasObj = {}
  const attrObj = {}
  let attrs = []
  let id = ''
  let tag = ''
  let content = ''
  let classes = ''

  // 提取所有的 [attr] [attr2=value2]  TODO: 含有>或+的情况
  attrs = str.match(/\[([a-zA-Z0-9=])+\]/g) || []
  for (let attr of attrs) {
    attr = (attr || '').replace(/^\[|\]$/g, '')
    attr = attr.split('=')
    attrObj[attr[0]] = attr[1]
  }
  // 提取 datas (从attrObj中提取, 并删除attrObj中值)
  propertyScanner(attrObj, (key, value) => {
    if (isNonEmptyString(key) && key.search(/^data[A-Z]/g)) {
      datasObj[key] = value
      attrObj[key] = null
      delete attrObj[key]
    }
  })

  // 提取 id
  id = str.match(/#([a-zA-Z0-9\-_]+)/g) || []
  id = (id[0] || '').replace(/^#/g, '')
  // 提取 tag
  tag = str.match(/^([a-zA-Z0-9]*)/g) || []
  tag = tag[0]
  // 提取 content
  content = str.match(/\{\{.+\}\}/g) || []
  content = content[0]
  // 提取 class
  classes = str.match(/\.[a-zA-Z0-9\-_]+/g) || []
  classes = classes.join(' ').replace(/\./g, '')

  const config = {
    tag: tag,
    content: content,
    attrs: {
      'id': id,
      'class': classes
    },
    datas: datasObj
  }
  config.attrs = objectMerge(config.attrs, attrs)
  return config
}

/**
 * @todo TODO: 支持 div.class-name#id[attr1][attr2=value2]{{}} 等语法糖
 * @param {Stirng | CreateDomConfig} config
 *  String: 'div'、'div#id.class[attr1][attr2=value2], 暂不支持 div、span 等自动识别为 document.createTextNode
 * @param {*} refs
 */
export const createDom = (config, refs) => {
  if (typeof config !== 'object' && !isFunction(config) && typeof config !== 'string') {
    throw new ParameterError('Type of Parameter config must be String or Function or Object.')
  }
  if (isEmptyString(config)) {
    throw new ParameterError('Parameter config can not is a empty string.')
  }
  let cfg = config
  if (isNonEmptyString(config)) {
    // return document.createTextNode(config) TODO:
    if (config.search(/[^a-zA-Z0-9]+/g) !== -1) {
      cfg = strToConfig(config)
    } else {
      cfg = {
        tag: config
      }
    }
  }
  if (!isNonEmptyString(cfg.tag)) {
    throw new ParameterError('Typeof config.tag must be String and not empty.')
  }

  const dom = document.createElement(cfg.tag)
  propertyScanner(cfg, (prop, value, obj) => {
    if (prop === 'tag') {
      return
    }
    // TODO: content 、childs 顺序
    if (prop === 'content') {
      isNonEmptyString(value) && dom.appendChild(document.createTextNode(value))
    } else if (prop === 'id') {
      isNonEmptyString(value) && dom.setAttribute('id', value)
    } else if (prop === 'childs') {
      const childs = value ? isArray(value) ? value : [ value ] : []
      for (const child of childs) {
        dom.appendChild(createDom(child))
      }
    } else if (prop === 'datas') {
      typeof value === 'object' && propertyScanner(value, (data, dataValue) => {
        isNonEmptyString(data) && dom.setAttribute(`data-${camelPascalToHyphe(data)}`, dataValue)
      })
    } else if (prop === 'attrs') {
      typeof value === 'object' && propertyScanner(value, (attr, attrValue) => {
        if (attr === 'class') {
          if (isNonEmptyString(attrValue)) {
            dom.className = (dom.className || ' ').trim() + ' ' + attrValue.trim() // eslint-disable-line no-unused-expressions
            dom.className = dom.className.trim()
          }
        } else {
          isNonEmptyString(attr) && dom.setAttribute(`${camelPascalToHyphe(attr)}`, attrValue)
        }
      })
    }
  })
  return dom
}
