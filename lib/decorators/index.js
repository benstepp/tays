import { include } from '../meta'
import { DecoratorManager } from './decorator_manager'
import { AssociationDecorators } from './association_decorators'

@include(AssociationDecorators)
class Decorators {
  static get reset() {
    return () => { this.manager = new DecoratorManager() }
  }

  static get manager() {
    if (this.__manager === undefined) { this.reset() }
    return this.__manager
  }

  static set manager(value) {
    this.__manager = value
    return this.__manager
  }
}

export { Decorators }
