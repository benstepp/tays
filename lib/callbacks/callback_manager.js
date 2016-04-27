import { includes } from 'lodash'

class CallbackManager {

  constructor() {
    this.callbacks = new Map()
  }

  set_callback(type, function_name) {
    const type_callbacks = this.get_callbacks(type)
    if (!includes(type_callbacks, function_name)) {
      type_callbacks.push(function_name)
    }
  }

  get_callbacks(type) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, [])
    }
    return this.callbacks.get(type)
  }

  run_callbacks(type, instance) {
    const callbacks = this.get_callbacks(type)
    callbacks.forEach(callback => {
      instance[callback]()
    })
  }

}

export { CallbackManager }
