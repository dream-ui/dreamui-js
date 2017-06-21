
import {
  isNonEmptyString,
  arrayLikeContains,
  trim,
  ClassNameError
} from './../../base/index.js'

export const hasClass = (ele, cls) => {
  if (!ele || !(ele instanceof HTMLElement) || !isNonEmptyString(cls)) {
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
  if (!ele || !(ele instanceof HTMLElement) || !isNonEmptyString(cls)) {
    return ele
  }
  if (!hasClass(ele, cls)) {
    ele.setAttribute('class', `${ele.getAttribute('class')} ${cls}`)
  }
  return ele
}

export const removeClass = (ele, cls) => {
  if (!ele || !(ele instanceof HTMLElement) || !isNonEmptyString(cls)) {
    return
  }
  const classs = cls.split(' ')
  let resultClassName = ele.className
  for (const item of classs) {
    if (isNonEmptyString(item)) {
      resultClassName = resultClassName.replace(new RegExp(item, 'g'), '')
    }
  }
  ele.className = trim(resultClassName)
  return ele
}
