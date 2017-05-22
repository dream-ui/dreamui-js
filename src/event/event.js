const types = require('./../types/types')

/**
 * JS 发布订阅模式的实现
 */
class PubSub {

  constructor () {
    if (this.instanceCache) {
      return this.instanceCache
    }
    this.instanceCache = this
    this.topics = [] // 事件数组, 字符串数组
    this.pubsub = {} // { 'event-name': [func1, func2] }
    return this.instanceCache
  }

  /**
   * 发布主题
   * @param {string} topic
   */
  publish (topic, ...rest) {
    if (types.isNotBlankString(topic)) {
      return
    }
    if (!this.topics[topic]) {
      this.topics.push(topic)
    }
    if (types.isArray(this.pubsub[topic])) {
      const funcList = this.pubsub[topic]
      for (const func of funcList) {
        if (types.isFunction(func)) {
          func.apply(null, ...rest)
        }
      }
    }
  }

  /**
   * 订阅主题
   * @param {string} topic
   * @param {function | Array<function>} func
   */
  subscribe (topic, func) {
    if (types.isNotBlankString(topic)) {
      return
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
   * 取消订阅某个主题
   * @param {string} topic
   * @param {function | Array<function>} func
   */
  unSubscribe (topic, func) {
    if (types.isNotBlankString(topic)) {
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

module.exports = PubSub
