/**
 * Several SQL specific things are handled directly by the engines that
 * are being used. The most common of that is the quoting. This class
 * just holds all of the methods that are simply delegated to the
 * underlying sql engines.
*/
class EngineDelegation {

  quote_table_name(table_name) {
    return this.engine.quote_table_name(table_name)
  }

  quote_column_name(column_name) {
    return this.engine.quote_column_name(column_name)
  }

  quote(thing) {
    return this.engine.quote(thing)
  }

  quoted(node, attribute) {
    if (attribute && attribute.able_to_type_cast) {
      return this.quote(attribute.type_cast_for_database(node))
    } else {
      return this.quote(node, this.column_for(attribute))
    }
  }

  column_for(attribute) {
    if (attribute) {
      const name = attribute.name
      const table = attribute.relation.name
      return table.column(name)
    }
  }

}

export { EngineDelegation }
