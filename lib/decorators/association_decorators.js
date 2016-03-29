import { BelongsToDefinition } from './definitions'
import { HasOneDefinition } from './definitions'
import { HasManyDefinition } from './definitions'
import { HasAndBelongsToManyDefinition } from './definitions'

class AssociationDecorators {
  static get has_many() {
    return (association, options) => {
      return this.add_association(new HasManyDefinition(association, options))
    }
  }

  static get belongs_to() {
    return (association, options) => {
      return this.add_association(new BelongsToDefinition(association, options))
    }
  }

  static get has_one() {
    return (association, options) => {
      return this.add_association(new HasOneDefinition(association, options))
    }
  }

  static get has_and_belongs_to_many() {
    return (association, options) => {
      return this.add_association(new HasAndBelongsToManyDefinition(association, options))
    }
  }

  static add_association(association) {
    this.manager.add_association(association)
    return function() {}
  }
}

export { AssociationDecorators }
