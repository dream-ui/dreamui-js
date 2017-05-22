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

module.exports = {
  isWeChat,
  isQQ
}
