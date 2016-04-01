import { Definition } from './definition'

class HasManyDefinition extends Definition {

  get decorator() {
    return 'has_many'
  }

}

export { HasManyDefinition }
