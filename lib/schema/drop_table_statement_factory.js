import { StatementFactory } from './statement_factory'
import * as Sequel from '../sequel'
const default_options = Symbol()
const parse_options = Symbol()

class DropTableStatementFactory extends StatementFactory {
  constructor(table_name, options) {
    super(table_name, options)
    this.options = Object.assign({}, options, this[default_options])
    this.manager = this.table.drop()
    this[parse_options]()
  }

  [parse_options]() {
    for (let key in this.options) {
      if (this.options[key]) {
        this.manager[key]()
      }
    }
  }

  get [default_options]() {
    return { cascade: true }
  }
}

export { DropTableStatementFactory }
