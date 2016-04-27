import { Definition } from './definitions'

class DecoratorManager {

  constructor() {
    this.associations = {}
    this.validations = []
    this.callbacks = []
  }

  add_association(association) {
    if (association instanceof Definition) {
      this.associations[association.name] = association
    } else {
      throw new Error(`Cannot add ${association} because it is not an instance of Association.`)
    }
  }

  add_callback(type, name) {
    this.callbacks.push({ type, name })
  }

}

export { DecoratorManager }
