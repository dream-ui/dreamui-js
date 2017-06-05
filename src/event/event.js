/**
 * @author borenXue
 * @homesite http://www.xueboren.com
 * @email boren.xue@outlook.com
 * @date 2017-02-28 02:55:49
 * @desc JS 发布订阅模式的实现: PubSub
*/

const types = require('./../types/types')
const { TopicEmptyError } = require('./../exceptions/EventErrors')

/**
 * JS 发布订阅模式的实现
 *
 * @example <caption>使用示例</caption>
 *
 * const pubsub = new PubSub()
 *
 * const testCallback = (name, ...rest) => {
 *  // this function will be only triggerd by the 'test' event emited.
 * }
 *
 * const allCallback = (name, ...rest) => {
 *  // this function will be triggerd by all event emited.
 * }
 *
 * pubsub.on('test', testCallback)
 * pubsub.all(allCallback)
 *
 * pubsub.emit('test', 1, 2)
 *
 * // 移除订阅器
 * pubsub.unOn('test', testCallback)
 * pubsub.unAll(allCallback)
 *
 *
 */
class PubSub {
  /**
   * 生成 PubSub 实例(单例模式)
   */
  constructor () {
    /**
     * 事件数组, 字符串数组1
     * @type {Array<String>}
     */
    this.topics = []
    /**
     * 事件数组, 字符串数组
     * @type {Object}
     * @property {Array<Function>} eventNameA - 主题 eventNameA 订阅的函数列表
     * @property {Array<Function>} eventNameB - 主题 eventNameB 订阅的函数列表
     */
    this.pubsub = {} // { 'event-name': [func1, func2] }
  }

  /**
   * 获取 PubSub 实例(单例模式)
   * @return {PubSub} PubSub 实例
   */
  static getInstance (forceNew) {
    if (PubSub.instanceCache && !forceNew) {
      return PubSub.instanceCache
    }
    /**
     * 事件发布订阅器
     * @type {PubSub}
     */
    PubSub.instanceCache = new PubSub()
    return PubSub.instanceCache
  }

  /**
   * 获取 PubSub 版本号
   * @return {string} 版本号
   */
  static _version () {
    return '1.0.'
  }

  /**
   * 发布主题 emit
   * @param {string} topic - 要发布的主题
   * @emits {MyTopic1} 发布 主题/事件 MyTopic1
   */
  emit (topic, ...rest) {
    if (types.isEmptyString(topic)) {
      return
    }
    if (!this.topics[topic]) {
      this.topics.push(topic)
    }
    if (types.isArray(this.pubsub[topic])) {
      const funcList = this.pubsub[topic]
      for (const func of funcList) {
        if (types.isFunction(func)) {
          var params = [topic, ...rest]
          func.apply(null, params)
        }
      }
    }
  }

  /**
   * 订阅主题 on
   * @param {string} topic - 要订阅的主题
   * @param {function | Array<function>} func - 主题被发布时, 需要被触发的函数
   *
   * @listens {MyTopic1} 订阅 MyTopic1 主题
   *
   * @throws {TopicEmptyError} throw TopicEmptyError when topic is empty or null.
   */
  on (topic, func) {
    if (types.isEmptyString(topic)) {
      throw new TopicEmptyError('')
    }
    if (!types.isArray(this.pubsub[topic])) {
      this.pubsub[topic] = []
    }
    if (types.isArray(func)) {
      this.pubsub[topic] = this.pubsub[topic].concat(func)
    } else if (types.isFunction(func)) {
      this.pubsub[topic].push(func)
    }
  }

  /**
   * 取消订阅某个主题 unSubscribe
   * @param {string} topic
   * @param {function | Array<function>} func
   */
  unOn (topic, func) {
    if (types.isEmptyString(topic)) {
      return
    }
    if (types.isArray(this.pubsub[topic])) {
      const funcList = this.pubsub[topic]
      if (types.isArray(func)) {
        this.pubsub[topic] = types.arrayRemoveRepeat(funcList, func)
      } else if (types.isFunction(func)) {
        this.pubsub[topic] = types.arrayRemoveObject(funcList, func)
      }
    }
  }
}

PubSub.instanceCache = null

export default PubSub
module.exports = PubSub
