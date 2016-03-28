import { Base } from '../base'
import { KlassFactory } from '../meta'
import { AssociationTransformer } from './transformers'

class Factory {
  constructor(user_defined_klass, ast) {
    this.user_defined_klass = user_defined_klass
    this.ast = ast
    this.define_framework_klass()
  }

  define_framework_klass() {
    this.create_new_klass()
    this.define_methods()
    this.klass = this.copy_user_klass()
  }

  create_new_klass() {
    const klass_name = `__${this.user_defined_klass.name}__`
    const klass_factory = new KlassFactory(klass_name, Base)
    this.framework_klass = klass_factory.klass
  }

  define_methods() {
    const association_transformer = new AssociationTransformer(this.ast.associations)
    association_transformer.transform(this.framework_klass)
  }

  copy_user_klass() {
    const klass_name = this.user_defined_klass.name
    const klass_factory = new KlassFactory(klass_name, this.framework_klass)
    return klass_factory.klass
  }

  get exports() {
    return {
      default: this.klass,
      [this.klass.name]: this.klass
    }
  }
}

export { Factory }
