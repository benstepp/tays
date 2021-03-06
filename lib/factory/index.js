import { Base } from '../base'
import { KlassFactory } from '../meta'
import * as Transformers from './transformers'

class Factory {
  constructor(user_defined_klass, ast) {
    this.user_defined_klass = user_defined_klass
    this.ast = ast
    this.define_framework_klass()
    this.redefine_user_klass()
    this.decorate_user_klass()
  }

  define_framework_klass() {
    this.create_new_klass()
    this.define_methods()
  }

  create_new_klass() {
    const klass_name = `__${this.user_defined_klass.name}__`
    const klass_factory = new KlassFactory(klass_name, Base)
    this.framework_klass = klass_factory.klass
  }

  define_methods() {
    for (let key in Transformers) {
      const transformer = new Transformers[key](this.ast)
      transformer.transform(this.framework_klass)
    }
  }

  redefine_user_klass() {
    const klass_name = this.user_defined_klass.name
    const klass_factory = new KlassFactory(klass_name, this.framework_klass)
    this.klass = klass_factory.klass
  }

  decorate_user_klass() {
    for (let key in Transformers) {
      const transformer = new Transformers[key](this.ast)
      transformer.register(this.klass)
    }
  }

  get exports() {
    return {
      default: this.klass,
      [this.klass.name]: this.klass,
      __esModule: true
    }
  }
}

export { Factory }
