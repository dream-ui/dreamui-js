import {
  notEmptyString,
  hypheToCamel,
  propertyScanner,
  ParameterError,
  ParameterHTMLElementError,
  ParameterNonEmptyStringError
} from './../../base/index.js'

const ieVersion = Number(window && window.document ? window.document.documentMode : 10)

const parametersAssets = (ele, styleName) => {
  if (!(ele instanceof HTMLElement)) {
    throw new ParameterHTMLElementError('Parameter ele must be a HTMLElement instance.')
  }
  if (!notEmptyString(styleName)) {
    throw new ParameterNonEmptyStringError('Parameter styleName must be a non-empty string.')
  }
}

export const getStyle = (ele, styleName, value) => {
  parametersAssets(ele, styleName)

  let styleProp = hypheToCamel(styleName)
  if (styleName === 'float') {
    styleProp = ieVersion < 9 ? 'styleFloat' : 'cssFloat'
  }
  try {
    if (ieVersion < 9) {
      if (styleProp === 'opacity') {
        try {
          return ele.filters.item('alpha').opacity / 100
        } catch (e) {
          return 1.0
        }
      } else {
        return ele.style[styleProp] || ele.currentStyle ? ele.currentStyle[styleProp] : null
      }
    } else {
      const computed = document.defaultView.getComputedStyle(ele, '')
      return ele.style[styleProp] || computed ? computed[styleProp] : null
    }
  } catch (e) {
    return ele.style[styleProp]
  }
}

export const setStyle = (ele, styleName, value) => {
  if (!(ele instanceof HTMLElement)) {
    throw new ParameterHTMLElementError('Parameter ele must be a HTMLElement instance.')
  }
  if (typeof styleName === 'object') {
    propertyScanner(styleName, (prop, propValue, obj) => {
      notEmptyString(prop) && setStyle(ele, prop, propValue)
    })
  } else if (notEmptyString(styleName)) {
    // Tip: styleName: background-color:
    if (styleName === 'opacity' && ieVersion < 9) {
      ele.style.filter = isNaN(value) ? '' : `alpha(opacity=${value * 100})`
    } else {
      ele.style[hypheToCamel(styleName)] = value
    }
  } else {
    throw new ParameterError('Parameter styleName must be a non-empty string or an object.')
  }
}
