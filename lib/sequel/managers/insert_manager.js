import { TreeManager } from './tree_manager'
import * as Nodes from '../nodes'

class InsertManager extends TreeManager {
  constructor(table, values) {
    super()
    this.ast = new Nodes.InsertStatement()
    this.into(table)
    this.parse_values(values)
  }

  into(table) {
    this.ast.relation = table
    return this
  }

  parse_values(values) {
    values.forEach(value => {
      this.ast.value(value)
    })
    return this
  }

}

export { InsertManager }
