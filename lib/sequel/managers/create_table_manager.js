import { PostgresqlVisitor } from '../visitors'
import * as Nodes from '../nodes'

class CreateTableManager {

  constructor(table) {
    this.ast = new Nodes.CreateTableStatement(table)
  }

  add(column) {
    this.ast.columns.push(column)
    return this
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

}

export { CreateTableManager }
