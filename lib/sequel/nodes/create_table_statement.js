import { Node } from './node'
import { Relation } from '../relation'

class CreateTableStatement extends Node {
  constructor(table) {
    super()
    this.table = table
    this.columns = []
  }
}

export { CreateTableStatement }
