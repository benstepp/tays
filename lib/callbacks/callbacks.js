import { CallbackManager } from './callback_manager'
const managers = new Map()

/**
 * The Callbacks class creates a CallbackManager for every class which
 * either includes this class, or extends a class which has included
 * this class. It then delegates the static methods `get_callbacks`,
 * `set_callback` and `run_callbacks` to this CallbackManager.
 *
 * @mixin Callbacks
 */
class Callbacks {

  static get callback_manager() {
    if (!managers.has(this)) {
      managers.set(this, new CallbackManager())
    }
    return managers.get(this)
  }

  static get_callbacks(type) {
    return this.callback_manager.get_callbacks(type)
  }

  static set_callback(type, function_name) {
    return this.callback_manager.set_callbacks(type, function_name)
  }

  static run_callbacks(type, instance) {
    return this.callback_manager.run_callbacks(type, instance)
  }

}

export { Callbacks }
