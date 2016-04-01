import { Definition } from './definition'

class BelongsToDefinition extends Definition {

  get decorator() {
    return 'belongs_to'
  }

}

export { BelongsToDefinition }
