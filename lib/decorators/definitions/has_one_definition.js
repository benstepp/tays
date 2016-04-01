import { Definition } from './definition'

class HasOneDefinition extends Definition {

  get decorator() {
    return 'has_one'
  }

}

export { HasOneDefinition }
