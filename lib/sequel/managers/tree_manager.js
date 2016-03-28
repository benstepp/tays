import * as Nodes from '../nodes'
import { include } from '../../meta'
import { PostgresqlVisitor } from '../visitors'
import { FactoryMethods } from '../factory_methods'

@include(FactoryMethods)
class TreeManager {

  constructor() {
    this.ctx = undefined
    this.bind_values = []
    this.lock = null
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

  where(expression) {
    if (expression instanceof this.constructor) {
      expression = expression.ast
    }
    this.ctx.wheres.push(expression)
    return this
  }

  wrap_string_in_literal(string) {
    if (typeof string === 'string') {
      return new Nodes.SqlLiteral(string)
    } else {
      return string
    }
  }
}

export { TreeManager }
