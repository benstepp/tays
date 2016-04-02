import { AssociationReflection } from './association_reflection'

class HasAndBelongsToManyReflection extends AssociationReflection {

  get decorator() {
    return 'has_and_belongs_to_many'
  }

}

export { HasAndBelongsToManyReflection }
