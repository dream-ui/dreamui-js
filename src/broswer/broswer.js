/**
 * 微信存在 MicroMessenger/ NetType / Language/
 * 手机浏览器存在 Version/XX.XX Mobile/XX.XX
 * window.navigator.standalone
 */
const isWeChat = (userAgent) => {
  const ua = userAgent || window.navigator.userAgent
  return /MicroMessenger/i.test(ua) && /NetType/i.test(ua) && /Language/i.test(ua)
}

const isQQ = (userAgent) => {
  return /qq/i.test(userAgent || window.navigator.userAgent)
}

const copyText = (element, okCallback, errorCallback) => {
  // ie使用clipboardData实现
  if (window.clipboardData) {
    window.clipboardData.clearData()
    window.clipboardData.setData('Text', element.innerHTML)
    if (window.clipboardData.setData('Text') === element.innerHTML) {
      if (okCallback) okCallback()
      return
    }
  }
  // 使用createTextRange实现
  if (element.select && element.createTextRange) {
    element.select()
    var therange = void 0
    if (element.createTextRange) therange = element.createTextRange()
    therange = therange || document
    if (therange.execCommand && therange.execCommand('Copy')) {
      if (okCallback) okCallback()
      return
    }
  }
  // 使用document.createRange实现
  var range = document.createRange()
  range.selectNode(element)
  window.getSelection().addRange(range)
  if (document.execCommand && document.execCommand('copy')) {
    window.getSelection().removeAllRanges()
    if (okCallback) okCallback()
    return
  }

  if (errorCallback) errorCallback()
}

module.exports = {
  isWeChat,
  isQQ,
  copyText
}
