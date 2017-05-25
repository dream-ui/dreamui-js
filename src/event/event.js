/**
 * @author borenXue
 * @homesite http://www.xueboren.com
 * @email boren.xue@outlook.com
 * @date 2017-02-28 02:55:49
 * @desc JS 发布订阅模式的实现: PubSub
*/

const types = require('./../types/types')

/**
 * JS 发布订阅模式的实现
 *
 * @example
 * const pubsub = new PubSub()
 * pubsub.on('test', (name, ...rest) => {
 *  // do your things.
 * })
 * pubsub.emit('test', 1, 2)
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
   * 发布主题 publish emit
   * @param {string} topic
   */
  emit (topic, ...rest) {
    if (types.isBlankString(topic)) {
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
   * @param {string} topic
   * @param {function | Array<function>} func
   */
  on (topic, func) {
    if (types.isBlankString(topic)) {
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
   * 取消订阅某个主题 unSubscribe
   * @param {string} topic
   * @param {function | Array<function>} func
   */
  unOn (topic, func) {
    if (!types.isBlankString(topic)) {
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
