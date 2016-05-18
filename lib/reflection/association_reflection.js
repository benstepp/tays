import { AbstractReflection } from './abstract_reflection'

class AssociationReflection extends AbstractReflection {

  build(attributes) {
    return new this.target(attributes) // eslint-disable-line new-cap
  }

}

export { AssociationReflection }
