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

  association(name) {
    return this.constructor.reflect_on_association(name)
  }

}

export { Base }
