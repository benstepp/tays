class CallbackTransformer {

  constructor(ast) {
    this.callbacks = ast.callbacks
  }

  transform() {}

  register(klass) {
    this.callbacks.forEach(({type, name}) => {
      klass.set_callback(type, name)
    })
  }
}

export { CallbackTransformer }
