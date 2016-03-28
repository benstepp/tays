import { TreeManager } from './tree_manager'
import { last } from 'lodash'
import * as Nodes from '../nodes'

class SelectManager extends TreeManager {

  constructor(table) {
    super()
    this.ast = new Nodes.SelectStatement()
    this.ctx = last(this.ast.cores)
    this.from(table)
  }

  project(...projections) {
    this.ctx.projections.push(...projections.map(projection => {
      return this.wrap_string_in_literal(projection)
    }))
    return this
  }

  select(...projections) {
    return this.project.apply(this, projections)
  }

  from(table) {
    table = this.wrap_string_in_literal(table)
    if (table instanceof Nodes.Join) {
      this.ctx.source.right.push(table)
    } else {
      this.ctx.source.left = table
    }
    return this
  }

  order(...expressions) {
    this.ast.orders = this.ast.orders.concat(expressions)
    return this
  }

  limit(count = null) {
    this.ast.limit = new Nodes.Limit(count)
    this.top = new Nodes.Top(count)
    return this
  }

  offset(count = null) {
    this.ast.offset = new Nodes.Offset(count)
    return this
  }

  distinct() {
    this.ctx.set_quantifier = new Nodes.Distinct()
    return this
  }

  distinct_on(value = null) {
    this.ctx.set_quantifier = new Nodes.DistinctOn(value)
    return this
  }

  for_share() {
    this.ast.lock = new Nodes.ForShare()
    return this
  }

  for_update() {
    this.ast.lock = new Nodes.ForUpdate()
    return this
  }

  join(relation, klass = Nodes.InnerJoin) {
    this.ctx.source.right.push(this.create_join(relation, null, klass))
    return this
  }

  left_join(relation) {
    return this.join(relation, Nodes.LeftJoin)
  }

  on(expression) {
    last(this.ctx.source.right).right = new Nodes.On(expression)
    return this
  }

  group(...columns) {
    columns.forEach(column => {
      this.ctx.groups.push(new Nodes.Group(column))
    })
    return this
  }
}

export { SelectManager }
