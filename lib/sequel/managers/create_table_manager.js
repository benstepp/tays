import { PostgresqlVisitor } from '../visitors'
import * as Nodes from '../nodes'

class CreateTableManager {

  constructor(table_name) {
    this.ast = new Nodes.CreateTableStatement(table_name)
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

}

export { CreateTableManager }
