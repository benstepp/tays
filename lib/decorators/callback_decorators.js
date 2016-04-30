const add_callback = Symbol('add_callback')
const define_callback = Symbol('define_callback')

class CallbackDecorators {
  static get after_initialize() {
    return this[define_callback]('after_initialize')
  }

  static get before_validation() {
    return this[define_callback]('before_validation')
  }

  static get after_validation() {
    return this[define_callback]('after_validation')
  }

  static get before_save() {
    return this[define_callback]('before_save')
  }

  static get after_save() {
    return this[define_callback]('after_save')
  }

  static get before_create() {
    return this[define_callback]('before_create')
  }

  static get after_create() {
    return this[define_callback]('after_create')
  }

  static [define_callback](callback_type) {
    return (target, name, descriptor) => {
      if (name === undefined) name = target
      this[add_callback](callback_type, name)
      return () => {}
    }
  }

  static [add_callback](type, name) {
    this.manager.add_callback(type, name)
  }
}

export { CallbackDecorators }
