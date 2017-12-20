/**
 * 获取参数 key 的值
 * @param {string} key
 * @param {string} url
 * @return {string} 该 key 对应的值
 */
export const getParam = (key, url = window.location.href) => {
  const search = url.substring(url.indexOf('?') + 1)
  if (search === '') {
    return
  }
  const params = {}
  const kvs = search.split('&')
  for (const kv of kvs) {
    params[kv.split('=')[0]] = kv.split('=')[1]
  }
  return params[key]
}

/**
 * 判断是否含有参数 key
 * @param {string} url
 * @param {string} key
 * @return {boolean} 是否含有该参数
 */
export const hasParam = (url, key) => {

}

/**
 * 给指定 url 添加参数集合
 * @param {string} url
 * @param {object} params
 * @return {string} 处理后的新 url
 */
export const addParams = (url, params) => {

}

/**
 * 给 url 添加指定参数
 * @param {string} url
 * @param {string} key
 * @param {?string | ?int} value
 * @return {string} 处理后的新 url
 */
export const addParam = (url, key, value) => {

}

/**
 * 解析给定 url
 * @param {string} url
 * @return {Object} 解析后的信息对象
 */
export const parseUrl = (url) => {

}
