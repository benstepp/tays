import { CreateTableStatementFactory } from './create_table_statement_factory'
const create_table_definition = Symbol()
const add_statement = Symbol()

class SchemaStatements {

  create_table(table_name, options, statement) {
    if (statement === undefined) {
      statement = options
      options = {}
    }

    statement = this[create_table_definition](table_name, options, statement)
    this[add_statement](statement)
  }

  [create_table_definition](table_name, options, statement) {
    const factory = new CreateTableStatementFactory(table_name, options, statement)
    return factory.statement
  }

  [add_statement](statement) {
    this.statements.push(statement)
  }

}

export { SchemaStatements }