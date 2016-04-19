import { CreateTableStatementFactory } from './create_table_statement_factory'
import { AlterTableStatementFactory } from './alter_table_statement_factory'
const create_table = Symbol()
const alter_table = Symbol()
const add_factory = Symbol()

class SchemaStatements {

  /**
   * Creates a new table.
   *
   * ```js
   * this.create_table('users', t => {
   *   t.string('email', { null: false })
   *   t.string('encrypted_password', { null: true })
   * })
   * ```
   * @param {string} table_name - The name of the table to create. Note
   * that tays expects the table_name to be the plural of the class
   * name of the model which uses the table.
   * @param {object} [options] - Options for the created table.
   * @param {boolean} [options.primary_key=true] - Whether or not to
   * create an `id` column on the table. Defaults to true.
   * @param {boolean} [options.primary_key=true] - Whether or not to
   * add  `created_at` and `updated_at` columns to the table. Defaults
   * to true.
   * @param {function} statement - Operations to be performed on the
   * CREATE TABLE statement. This is where columns are added. To learn
   * more about what can be done in this function see the documentation
   * for the CreateTableStatementFactory.
   *
  */
  create_table(table_name, options, statement) {
    if (statement === undefined) {
      statement = options
      options = {}
    }

    this[create_table](table_name, options, statement)
  }

  add_column(table_name, column_name, type, options = {}) {
    this[alter_table](table_name, {}, t => {
      t[type](column_name, options)
    })
  }

  /**
   * The internal create_table method. This method requires all
   * parameters and is not intended to be used by the user.
   * See #create_table for information on the parameters this method
   * allows.
  */
  [create_table](table_name, options, statement) {
    const factory = new CreateTableStatementFactory(table_name, options, statement)
    this[add_factory](factory)
  }

  [alter_table](table_name, options, statement) {
    const factory = new AlterTableStatementFactory(table_name, options, statement)
    this[add_factory](factory)
  }

  [add_factory](factory) {
    this.factories.push(factory)
  }

}

export { SchemaStatements }
