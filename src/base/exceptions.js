
export class CommonError extends Error {
}

export class ClassNameError extends CommonError {
  constructor (message) {
    super('ClassNameError', message)
  }
}

export class ParameterError extends CommonError {
  constructor (message) {
    super('ParameterError', message)
  }
}

export class ParameterHTMLElementError extends ParameterError {
  constructor (message) {
    super('ParameterHTMLElementError', message)
  }
}

export class ParameterNonEmptyStringError extends ParameterError {
  constructor (message) {
    super('ParameterNonEmptyStringError', message)
  }
}

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
