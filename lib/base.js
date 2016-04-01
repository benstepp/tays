import { include } from './meta'
import { Reflection } from './reflection'
import { Registry } from './registry'

@include(Reflection)
class Base {

  constructor(attributes) {
    this.attributes = attributes
  }

  static get namespace() {
    return ''
  }

  static get registrar() {
    return Registry
  }

  read_association(name) {
    return {}
  }

  write_association(name, value) {
    return {}
  }

  build_association(name, attributes) {
    const reflection = this.constructor.reflect_on_association(name)
    const klass_name = reflection.target_name
    const Klass = this.constructor.registrar.get_model(klass_name)
    return new Klass(attributes)
  }

}

export { Base }
