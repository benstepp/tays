import { isPlainObject as is_plain_object } from 'lodash'

class Registry {

  static get models() {
    this.reset_models()
    return this.__models
  }

  static reset_models() {
    if (!is_plain_object(this.__models)) {
      this.__models = {}
    }
  }

  static get_namespace(namespace) {
    if (this.models[namespace] === undefined) {
      this.models[namespace] = {}
    }
    return this.models[namespace]
  }

  static register(model) {
    this.get_namespace(model.namespace)[model.name] = model
  }

  static get_model(name) {
    const [ namespace, model ] = this.registered_keys_for(name)
    return this.get_namespace(namespace)[model] || this.get_namespace('')[model]
  }

  static registered_keys_for(name) {
    return (name.indexOf('.') > -1) ? name.split('.') : ['', name]
  }

}

export { Registry }
