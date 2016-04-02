import { AssociationReflection } from './association_reflection'

class BelongsToReflection extends AssociationReflection {

  get decorator() {
    return 'belongs_to'
  }

  get belongs_to() {
    return true
  }

}

export { BelongsToReflection }
