import { StatementFactory } from './statement_factory'
import { ColumnTypes } from './column_types'
import { include } from '../meta'
import * as Sequel from '../sequel'

@include(ColumnTypes)
class AlterTableStatementFactory extends StatementFactory {
  constructor(table_name, options = {}, block = function() {}) {
    super(table_name, options)
    this.block = block
    this.manager = this.table.alter()
    this.block.apply(undefined, [this])
  }

  // TODO this is repeated
  add_column(name, type, options) {
    const column = this.table.column(name)[type](64)
    for (let key in options) {
      let value = options[key]
      if (key === 'default') value = Sequel.Nodes.build_quoted(value)
      column[key](value)
    }
    this.manager.add(column)
  }

  rename(new_table_name) {
    this.manager.rename(new_table_name)
  }

  rename_column(column_name, new_column_name) {
    const column = this.table.column(column_name).rename(new_column_name)
    this.manager.alter(column)
  }
}

export { AlterTableStatementFactory }
