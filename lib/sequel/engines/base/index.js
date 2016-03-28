class Base {

  quote_table_name(table_name) {
    return table_name
  }

  quote_column_name(column_name) {
    return column_name
  }

  quote(thing) {
    return thing
  }

  add_bind() {
    return '?'
  }

}

export { Base }
