import { BelongsToAssociation } from '../associations'
import { HasOneAssociation } from '../associations'
import { HasManyAssociation } from '../associations'
import { HasAndBelongsToManyAssociation } from '../associations'

class AssociationDecorators {
  static get has_many() {
    return (association, options) => {
      return this.add_association(new HasManyAssociation(association, options))
    }
  }

  static get belongs_to() {
    return (association, options) => {
      return this.add_association(new BelongsToAssociation(association, options))
    }
  }

  static get has_one() {
    return (association, options) => {
      return this.add_association(new HasOneAssociation(association, options))
    }
  }

  static get has_and_belongs_to_many() {
    return (association, options) => {
      return this.add_association(new HasAndBelongsToManyAssociation(association, options))
    }
  }

  static add_association(association) {
    this.manager.add_association(association)
    return function() {}
  }
}

export { AssociationDecorators }
