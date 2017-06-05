import {
  CommonError
} from './../base/CommonError.js'

export class ParameterError extends CommonError {
  constructor (message) {
    super('ParameterError', message)
  }
}

export class ParameterNonEmptyStringError extends ParameterError {
  constructor (message) {
    super('ParameterNonEmptyStringError', message)
  }
}

export class ParameterHTMLElementError extends ParameterError {
  constructor (message) {
    super('ParameterHTMLElementError', message)
  }
}
