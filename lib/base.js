import { include } from './meta'
import { Reflection } from './reflection'
import { Registry } from './registry'
import { ConnectionHandling } from './connection'
import { Callbacks } from './callbacks'
import { Attributes } from './attributes'

@include(Attributes)
@include(Callbacks)
@include(ConnectionHandling)
@include(Reflection)
class Base {

  constructor(attributes) {
    this.assign_attributes(attributes)
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
