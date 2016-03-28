import { Node } from './node'

class DeleteStatement extends Node {

  constructor(relation = undefined, wheres = []) {
    super()
    this.relation = relation
    this.wheres = wheres
    this.limit = undefined
  }

  accept(visitor, collector) {
    collector.push('DELETE FROM ')
    visitor.visit(this.relation)

    const options = { prefix: ' WHERE ', delimiter: ' AND ' }
    visitor.maybe_visit_many(this.wheres, collector, options)

    visitor.maybe_visit(this.limit, collector)
  }

}

export { DeleteStatement }
