import { StatementFactory } from './statement_factory'
const default_options = Symbol('default_options')
const parse_options = Symbol('parse_options')

class DropTableStatementFactory extends StatementFactory {
  constructor(table_name, options) {
    super(table_name, options)
    this.options = Object.assign({}, this[default_options], options)
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
