/**
 * 主题为空异常类
 * @extends {Error}
 *
 * @example <caption>抛出 TopicEmptyError 异常</caption>
 *
 * throw new TopicEmptyError('异常的详情描述')
 *
 */
export class TopicEmptyError extends Error {
  /**
   * @param {string} message - 异常的详情描述
   */
  constructor (message) {
    super('TopicEmptyError', message)
    return this
  }
}
