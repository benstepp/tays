import { Definition } from './definition'

class HasAndBelongsToManyDefinition extends Definition {

  get decorator() {
    return 'has_and_belongs_to_many'
  }

}

export { HasAndBelongsToManyDefinition }
