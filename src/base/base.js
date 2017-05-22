
/**
 * 比较版本号: A > B,则返回 1、  A < B,则返回 -1、 A = B,则返回 0
 * @param {String} versionA 版本号A
 * @param {String} versionB 版本号B
 */
const compareVersion = (versionA, versionB) => {
  if (!versionA || !versionB) {
    window.console.warn('[compareVersion]', '[params:]', '参数不合法')
    return
  }
  const [arrayA, arrayB] = [versionA.split('.'), versionB.split('.')]
  const maxLength = Math.max(arrayA.length, arrayB.length)
  let result = 0

  for (let idx = 0; idx < maxLength; idx++) {
    const [currentA, currentB] = [idx < arrayA.length ? parseInt(arrayA[idx], 10) : 0, idx < arrayB.length ? parseInt(arrayB[idx], 10) : 0]
    result = currentA - currentB
    if (result !== 0) {
      break
    }
  }
  return result === 0 ? 0 : (result > 0 ? 1 : -1)
}

// TODO: 金额千分位转换
const toThousandBit = (amount) => {
  const reg = /(\d)(?=(\d{3})+(?!\d))/g
  return String(amount).replace(reg, '$1,')
}

module.exports = {
  compareVersion,
  toThousandBit
}
