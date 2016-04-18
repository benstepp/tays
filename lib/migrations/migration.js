import { include } from '../meta'
import { SchemaStatements } from '../schema'

@include(SchemaStatements)
class Migration {

  constructor() {
    this.statements = []
    this.change()
  }

  run() {

  }

}

export { Migration }
