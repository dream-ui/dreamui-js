
export const bindEvent = (func, ele = document) => {
  // TODO:
}

export const unBindEvent = (func, ele = document) => {
  // TODO:
}

export const bindOnce = (func, ele = document) => {
  // TODO:
}

export const transitionEnd = (element, cb) => {
  function whichTransitionEvent () {
    var t
    var el = document.createElement('surface')
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    }
    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t]
      }
    }
  }
  const transitionEvent = whichTransitionEvent()
  const cbNew = (e) => {
    cb(e)
    element.removeEventListener(transitionEvent, cbNew)
  }
  transitionEvent && element.addEventListener(transitionEvent, cbNew)
}
