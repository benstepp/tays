import { include } from '../../meta'
import { build_quoted } from './index'
import { Node } from './node'
import { Types } from '../types'
import { AddColumn, DropColumn, AlterColumn } from './unary'
import { RenameColumn } from './binary'
import * as Constraints from './constraint'

@include(Types)
class Column extends Node {
  constructor(column_name) {
    super()
    this.name = column_name
    this.constraints = []
  }

  null(value) {
    const constraint = new Constraints.NullConstraint(value)
    this.constraints.push(constraint)
    return this
  }

  default(value) {
    if (value !== undefined) {
      value = build_quoted(value)
    }
    const constraint = new Constraints.DefaultConstraint(value)
    this.constraints.push(constraint)
    return this
  }

  unique() {
    const constraint = new Constraints.UniqueConstraint()
    this.constraints.push(constraint)
    return this
  }

  add() {
    return new AddColumn(this)
  }

  alter() {
    this.constraints.map(c => c.alter())
    return new AlterColumn(this)
  }

  drop() {
    return new DropColumn(this)
  }

  rename(new_column_name) {
    return new RenameColumn(this, new this.constructor(new_column_name))
  }

}

export { Column }
