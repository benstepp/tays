import { include } from '../meta'
import { SchemaStatements } from '../schema'
import { map } from 'lodash'

@include(SchemaStatements)
class Migration {

  constructor() {
    this.factories = []
    this.change()
  }

  run() {

  }

  get statements() {
    return map(this.factories, 'statement')
  }

}

export { Migration }
