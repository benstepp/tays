import { include } from '../meta'
import { DecoratorManager } from './decorator_manager'
import { AssociationDecorators } from './association_decorators'
import { CallbackDecorators } from './callback_decorators'
const manager = Symbol('manager')

@include(AssociationDecorators)
@include(CallbackDecorators)
class Decorators {
  static get reset() {
    return () => { this.manager = new DecoratorManager() }
  }

  static get manager() {
    if (this[manager] === undefined) { this.reset() }
    return this[manager]
  }

  static set manager(value) {
    this[manager] = value
    return this[manager]
  }
}

export { Decorators }
