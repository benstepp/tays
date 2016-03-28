import { NotSupportedError } from '../not_supported_error'

class PlainString {
  constructor() {
    this.string = ''
  }

  get value() {
    return this.string
  }

  push(string) {
    this.string += string
  }

  add_bind() {
    throw new NotSupportedError(this.constructor, 'add_bind')
  }
}

export { PlainString }
