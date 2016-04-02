import { AssociationReflection } from './association_reflection'

class HasOneReflection extends AssociationReflection {

  get decorator() {
    return 'has_one'
  }

}

export { HasOneReflection }
