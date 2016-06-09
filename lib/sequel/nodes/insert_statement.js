import { Node } from './node'

class InsertStatement extends Node {
  constructor() {
    super()
    this.relation = null
    this.columns = []
    this.values = []
    this.select = null
  }

  value(value) {
    this.columns.push(value.left)
    this.values.push(value.right)
    return this
  }
}

export { InsertStatement }
