import { Node } from './node'

class CreateTableStatement extends Node {
  constructor(table) {
    super()
    this.table = table
    this.columns = []
  }
}

export { CreateTableStatement }
