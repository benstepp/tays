import { StatementFactory } from './statement_factory'
import { ColumnTypes } from './column_types'
import { map, includes } from 'lodash'
import { include } from '../meta'
import * as Sequel from '../sequel'
const default_options = Symbol('default_options')
const add_defaults = Symbol('add_defaults')
const add_primary_key = Symbol('add_primary_key')
const add_timestamps = Symbol('add_timestamps')
const can_add_primary_key = Symbol('can_add_primary_key')
const can_add_timestamps = Symbol('can_add_timestamps')

@include(ColumnTypes)
class CreateTableStatementFactory extends StatementFactory {
  constructor(table_name, options, block) {
    super(table_name, options)
    this.options = Object.assign({}, this[default_options], options)
    this.block = block
    this.manager = this.table.create()
    this.block.apply(undefined, [this])
    this[add_defaults]()
  }

  add_column(name, type, options) {
    const column = this.table.column(name)[type](64)
    for (let key in options) {
      let value = options[key]
      if (key === 'default') value = Sequel.Nodes.build_quoted(value)
      column[key](value)
    }
    this.manager.columns(column)
  }

  [add_defaults]() {
    this[add_primary_key]()
    this[add_timestamps]()
  }

  [add_primary_key]() {
    if (this[can_add_primary_key]) {
      this.primary_key('id', {})
    }
  }

  get [can_add_primary_key]() {
    const column_names = map(this.manager.ast.columns, 'name')
    return (
      this.options.primary_key &&
      !includes(column_names, 'id')
    )
  }

  [add_timestamps]() {
    if (this[can_add_timestamps]) {
      this.timestamps()
    }
  }

  get [can_add_timestamps]() {
    const column_names = map(this.manager.ast.columns, 'name')
    return (
      this.options.timestamps &&
      !includes(column_names, 'created_at') &&
      !includes(column_names, 'updated_at')
    )
  }

  get [default_options]() {
    return {
      primary_key: true,
      timestamps: true
    }
  }
}

export { CreateTableStatementFactory }
