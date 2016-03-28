import { Attribute } from './nodes'
import { SelectManager } from './managers'

class Relation {

  constructor(table_name) {
    this.name = table_name
  }

  column(column_name) {
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

}

export { Relation }
