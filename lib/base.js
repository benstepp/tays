import { include } from './meta'
import { Reflection } from './reflection'

@include(Reflection)
class Base {

  static get namespace() {
    return ''
  }

  read_association(name) {
    return {}
  }

  write_association(name, value) {
    return {}
  }

}

export { Base }
