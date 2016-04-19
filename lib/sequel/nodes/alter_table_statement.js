import { Node } from './node'

class AlterTableStatement extends Node {
  constructor(table) {
    super()
    this.table = table
    this.columns = []
  }
}

export { AlterTableStatement }
