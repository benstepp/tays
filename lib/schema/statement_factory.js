import * as Sequel from '../sequel'

class StatementFactory {

  constructor(table_name, options) {
    this.table = new Sequel.Relation(table_name)
    this.options = options
  }

  get statement() {
    return this.manager.to_sql()
  }

}

export { StatementFactory }
