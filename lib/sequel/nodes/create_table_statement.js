import { Node } from './node'
import { Relation } from '../relation'

class CreateTableStatement extends Node {
  constructor(table_name) {
    super()
    this.table = new Relation(table_name)
    this.columns = []
  }
}

export { CreateTableStatement }
