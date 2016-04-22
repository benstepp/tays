import { PostgresqlVisitor } from '../visitors'
import { Relation } from '../relation'
import * as Nodes from '../nodes'

class AlterTableManager {

  constructor(table) {
    this.ast = new Nodes.AlterTableStatement(table)
  }

  add(...columns) {
    this.ast.columns.push(...columns.map(c => c.add()))
    return this
  }

  alter(...columns) {
    this.ast.columns.push(...columns.map(c => c.alter()))
    return this
  }

  drop(...columns) {
    this.ast.columns.push(...columns.map(c => c.drop()))
    return this
  }

  rename(new_table_name) {
    this.ast.rename = new Nodes.RenameTable(new Relation(new_table_name))
    return this
  }

  to_sql(visitor = new PostgresqlVisitor()) {
    visitor.accept(this.ast, visitor.collector)
    return visitor.collector.value
  }

}

export { AlterTableManager }
