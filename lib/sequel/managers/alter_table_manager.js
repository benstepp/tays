import { PostgresqlVisitor } from '../visitors'
import * as Nodes from '../nodes'

class AlterTableManager {

  constructor(table) {
    this.ast = new Nodes.AlterTableStatement(table)
  }

  columns(...columns) {
    this.ast.columns.push(...columns)
    return this
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

}

export { AlterTableManager }
