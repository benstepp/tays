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
 * The ColumnTypes class delegates column type methods to the add_column
 * method of the classes which include this class.
 *
 * @mixin ColumnTypes
 */
class ColumnTypes {
  boolean(name, options) {
    this.add_column(name, 'boolean', options)
  }

  date(name, options) {
    this.add_column(name, 'date', options)
  }

  datetime(name, options) {
    this.add_column(name, 'datetime', options)
  }

  primary_key(name, options) {
    this.add_column(name, 'primary_key', options)
  }

  string(name, options) {
    this.add_column(name, 'varchar', options)
  }

  text(name, options) {
    this.add_column(name, 'text', options)
  }

  timestamps() {
    this.add_column('created_at', 'datetime', {})
    this.add_column('updated_at', 'datetime', {})
  }
}

export { ColumnTypes }
