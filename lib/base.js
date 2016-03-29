import { include } from './meta'
import { Reflection } from './reflection'

@include(Reflection)
class Base {

  read_association(name) {
    return {}
  }

  write_association(name, value) {
    return {}
  }

}

export { Base }
