
import {
  CommonError
} from './../base/CommonError.js'

export class ClassNameError extends CommonError {
  constructor (message) {
    super('ClassNameError', message)
  }
}
