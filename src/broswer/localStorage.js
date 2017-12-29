
/**
 * 设置或删除 localStorate, 若已存在则覆盖
 * @param {String} key localstorage 键值
 * @param {any} value 要存储的值
 *    value 为 null 或 undefined 时,则代表删除
 *    value 支持 Array、Object、String(简单类型会自动转换为String类型)
 */
export const setLocalStorage = (key, value) => {
  // key 必须为非空字符串

  if (typeof key !== 'string') return console.warn('setLocalStorage', 'key must be a string')

  if (key.trim() === '') return console.warn('setLocalStorage', 'key must be a not-empty string')

  // value 不存在时 代表删除
  if (!value) return window.localStorage.removeItem(key)

  const val = typeof value === 'string' ? value : JSON.stringify(value)
  window.localStorage.setItem(key, val)
}

/**
 * 获取 key 对应的 localStorage 值
 * @param {String} key
 */
export const getLocalStorage = (key) => {
  // key 必须为非空字符串

  if (typeof key !== 'string') return console.warn('setLocalStorage', 'key must be a string')

  if (key.trim() === '') return console.warn('setLocalStorage', 'key must be a not-empty string')

  const value = window.localStorage.getItem(key)

  const val = typeof value === 'string' ? value : JSON.stringify(value)
  return val
}

/**
 * 初始化存储对象
 *  若为字符串, 则直接返回
 *  若为对象或数组, 则新增 $save、$remove 方法
 * @param {*} key
 * @param {*} newValue
 * // TODO: 预定义一个 Object 与 Array 类
 * // TODO: Object 与 Array 的实时保存功能
 */
export const initLocalStorage = (key, newValue) => {
  // key 必须为非空字符串
  if (typeof key !== 'string') return console.warn('getLocalStorage', 'key must be a string')

  if (key.trim() === '') return console.warn('getLocalStorage', 'key must be a not-empty string')

  // 给 val 赋值
  let valString = window.localStorage.getItem(key)
  let val = null
  if (!valString) {
    valString = typeof newValue === 'string' ? newValue : (
      newValue ? JSON.stringify(newValue) : ''
    )
  }
  try {
    val = JSON.parse(valString)
  } catch (e) {
    val = valString
  }

  // 如果 val 为对象则绑定 $save 与 $remove
  if (typeof val === 'object' || val instanceof Array) {
    Object.defineProperties(val, {
      '$save': {
        configurable: false,
        enumerable: false,
        value () { window.localStorage.setItem(key, JSON.stringify(val)) },
        writable: false
      },
      '$remove': {
        configurable: false,
        enumerable: false,
        value () { window.localStorage.setItem(key, JSON.stringify(val)) },
        writable: false
      }
    })
  }
  return val
}
