import { CreateTableStatementFactory } from './create_table_statement_factory'
import { AlterTableStatementFactory } from './alter_table_statement_factory'
import { DropTableStatementFactory } from './drop_table_statement_factory'
const create_table = Symbol('create_table')
const drop_table = Symbol('drop_table')
const alter_table = Symbol('alter_table')
const add_factory = Symbol('add_factory')

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

  /**
   * Adds a new column
   *
   * ```js
   * this.add_column('users', 'email', 'string', { unique: true, index: true })
   * ```
   * @param {string} table_name - The name of the table to add the
   * column to.
   * @param {string} column_name - The name of the new column
   * @param {string} type - The data type for the new column
   * @param {boolean} [options.unique=false] - Whether or not to create
   * a unique constraint on the column. defaults to false.
   * @param {boolean} [options.index=false] - Whether or not to index
   * the column. Defaults to false.
   * @param {string} [options.using='btree'] - If an index is specified,
   * it will be index using this method.
  */
  add_column(table_name, column_name, type, options = {}) {
    this[alter_table](table_name, {}, t => {
      t[type](column_name, options)
    })
  }

  drop_column(table_name, column_name, type, options = {}) {
    this[alter_table](table_name, {}, t => {
      t[type](column_name, options)
    })
  }

  drop_table(table_name, options = {}) {
    this[drop_table](table_name, options)
  }

  /**
   * Renames a table.
   * @param {string} table_name - The current table name
   * @param {string} new_table_name] - The new table name
  */
  rename_table(table_name, new_table_name) {
    this[alter_table](table_name, {}, t => {
      t.rename(new_table_name)
    })
  }

  rename_column(table_name, column_name, new_column_name) {
    this[alter_table](table_name, {}, t => {
      t.rename_column(column_name, new_column_name)
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

  [drop_table](table_name, options) {
    const factory = new DropTableStatementFactory(table_name, options)
    this[add_factory](factory)
  }

  [add_factory](factory) {
    this.factories.push(factory)
  }

}

export { SchemaStatements }
