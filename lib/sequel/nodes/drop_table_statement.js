import { Node } from './node'

class DropTableStatement extends Node {
  constructor(table) {
    super()
    this.table = table
  }
}

export { DropTableStatement }
