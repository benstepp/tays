const add_callback = Symbol('add_callback')

class CallbackDecorators {
  static get before_validation() {
    return (target, name, description) => {
      if (name === undefined) name = target
      this[add_callback]('before_validation', name)
      return () => {}
    }
  }

  static [add_callback](type, name) {
    this.manager.add_callback(type, name)
  }
}

export { CallbackDecorators }
