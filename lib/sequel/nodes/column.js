import { Node } from './node'
import * as Types from './type'

class Column extends Node {
  constructor(column_name) {
    super()
    this.name = column_name
  }

  varchar(value) {
    this.type = new Types.TypeVarchar(value)
    return this
  }

  date() {
    this.type = new Types.TypeDate()
    return this
  }
}

export { Column }
