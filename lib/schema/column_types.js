/**
 * Create Table and Alter Table Statements both allow the user to use
 * shorthand methods to create and alter columns. For example the
 * `t.string` method in the following snippet is one of the methods
 * defined in this class.
 *
 * ```js
 * this.create_table('users', t => {
 *   t.string('email', { null: false })
 * })
 * ```
 *
 * The ColumnTypes class delegates column type methods to the column
 * method of the classes which include this class.
 *
 * @mixin ColumnTypes
*/
class ColumnTypes {
  boolean(name, options) {
    return this.column(name, 'boolean', options)
  }

  date(name, options) {
    return this.column(name, 'date', options)
  }

  datetime(name, options) {
    return this.column(name, 'datetime', options)
  }

  primary_key(name, options) {
    return this.column(name, 'primary_key', options)
  }

  string(name, options) {
    return this.column(name, 'varchar', options)
  }

  text(name, options) {
    return this.column(name, 'text', options)
  }
}

export { ColumnTypes }
