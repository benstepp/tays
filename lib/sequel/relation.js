import { Attribute } from './nodes'
import { Column } from './nodes'
import { SelectManager } from './managers'
import { AlterTableManager } from './managers'
import { CreateTableManager } from './managers'
import { DropTableManager } from './managers'

class Relation {

  constructor(table_name) {
    this.name = table_name
  }

  attribute(column_name) {
    return new Attribute(this, column_name)
  }

  project(...projections) {
    return this.from().project(...projections)
  }

  select(...projections) {
    return this.project.apply(this, projections)
  }

  from() {
    return new SelectManager(this)
  }

  create() {
    return new CreateTableManager(this)
  }

  alter() {
    return new AlterTableManager(this)
  }

  drop() {
    return new DropTableManager(this)
  }

  column(column_name) {
    return new Column(column_name)
  }

}

export { Relation }
