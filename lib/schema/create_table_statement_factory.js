import { StatementFactory } from './statement_factory'
import * as Sequel from '../sequel'
const default_options = Symbol()
const parse_options = Symbol()

class CreateTableStatementFactory extends StatementFactory {
  constructor(table_name, options, block) {
    super()
    this.table = new Sequel.Relation(table_name)
    this.options = Object.assign({}, this[default_options], options)
    this.block = block
    this.manager = this.table.create()
    this[parse_options]()
    this.block.apply(undefined, [this])
  }

  column(name, type, options) {
    const column = this.table.column(name)[type](64)
    for (let key in options) {
      let value = options[key]
      if (key === 'default') value = Sequel.Nodes.build_quoted(value)
      column[key](value)
    }
    this.manager.columns(column)
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

  text(name, options) {
    this.column(name, 'text', options)
  }

  [parse_options]() {

  }

  get [default_options]() {
    return {}
  }
}

export { CreateTableStatementFactory }
