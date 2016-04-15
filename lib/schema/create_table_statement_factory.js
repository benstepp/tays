import { StatementFactory } from './statement_factory'
import * as Sequel from '../sequel'

class CreateTableStatementFactory extends StatementFactory {

  constructor(table_name, options, block) {
    super()
    this.table = new Sequel.Relation(table_name)
    this.options = options
    this.block = block
    this.manager = this.table.create()
    this.parse_options()
    this.parse_block()
  }

  parse_options() {

  }

  parse_block() {
    this.block.apply(undefined, [this])
  }

  primary_key(name, options) {
    this.column(name, 'primary_key', options)
  }

  string(name, options) {
    this.column(name, 'varchar', options)
  }

  boolean(name, options) {
    this.column(name, 'boolean', options)
  }

  column(name, type, options) {
    const column = this.table.column(name)[type](64)
    for (let key in options) {
      let value = options[key]
      if (key === 'default') {
        value = Sequel.Nodes.build_quoted(value)
      }
      column[key](value)
    }
    this.manager.columns(column)
  }

}

export { CreateTableStatementFactory }
