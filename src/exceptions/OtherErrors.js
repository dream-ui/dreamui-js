import {
  CommonError
} from './../base/CommonError.js'

export class ParameterError extends CommonError {

  constructor (message) {
    super('ParameterError', message)
  }

}
