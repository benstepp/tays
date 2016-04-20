import { include } from '../../meta'
import { Node } from './node'
import { Types } from '../types'
import { AddColumn, DropColumn, AlterColumn } from './unary'
import * as Constraints from './constraint'

@include(Types)
class Column extends Node {
  constructor(column_name) {
    super()
    this.name = column_name
    this.constraints = []
  }

  null(nullable = true) {
    const constraint = new Constraints.NullConstraint(nullable)
    this.constraints.push(constraint)
    return this
  }

  default(value) {
    const constraint = new Constraints.DefaultConstraint(value)
    this.constraints.push(constraint)
    return this
  }

  add() {
    return new AddColumn(this)
  }

  alter() {
    return new AlterColumn(this)
  }

  drop() {
    return new DropColumn(this)
  }

}

export { Column }
