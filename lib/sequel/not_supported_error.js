class NotSupportedError extends Error {

  constructor(klass, method) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.klass = klass
    this.method = method
  }

  get message() {
    return `${this.klass.name} does not support method: ${this.method}`
  }

  get name() {
    return this.constructor.name
  }

}

export { NotSupportedError }
