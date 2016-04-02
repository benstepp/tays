import { AssociationReflection } from './association_reflection'

class HasManyReflection extends AssociationReflection {

  get decorator() {
    return 'has_many'
  }

}

export { HasManyReflection }
