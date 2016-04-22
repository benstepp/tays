import { PostgresqlVisitor } from '../visitors'
import * as Nodes from '../nodes'

class DropTableManager {

  constructor(table) {
    this.ast = new Nodes.DropTableStatement(table)
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

  if_exists() {
    this.ast.if_exists = new Nodes.IfExists()
    return this
  }

  restrict() {
    this.ast.cascade = new Nodes.Restrict()
    return this
  }

  cascade() {
    this.ast.cascade = new Nodes.Cascade()
    return this
  }

}

export { DropTableManager }
