
import {
  CommonError
} from './../exceptions/EventErrors.js'

export class ClassNameError extends CommonError {

  constructor (message) {
    super('ClassNameError', message)
  }

}
