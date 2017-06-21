
import {
  notEmptyString,
  arrayLikeContains,
  ClassNameError
} from './../../base/index.js'

import trim from './../../base/trim'

export const hasClass = (ele, cls) => {
  if (!ele || !(ele instanceof HTMLElement) || !notEmptyString(cls)) {
    return false
  }
  if (trim(cls).indexOf(' ') !== -1) {
    throw new ClassNameError('The class string should not contain blank.')
  }
  if (ele.classList) {
    return arrayLikeContains(ele.classList, trim(cls))
  } else {
    return ele.className.indexOf(trim(cls)) !== -1
  }
}

export const addClass = (ele, cls) => {
  if (!ele || !(ele instanceof HTMLElement) || !notEmptyString(cls)) {
    return ele
  }
  if (!hasClass(ele, cls)) {
    ele.setAttribute('class', `${ele.getAttribute('class')} ${cls}`)
  }
  return ele
}

export const removeClass = (ele, cls) => {
  if (!ele || !(ele instanceof HTMLElement) || !notEmptyString(cls)) {
    return
  }
  const classs = cls.split(' ')
  let resultClassName = ele.className
  for (const item of classs) {
    if (notEmptyString(item)) {
      resultClassName = resultClassName.replace(new RegExp(item, 'g'), '')
    }
  }
  ele.className = trim(resultClassName)
  return ele
}
