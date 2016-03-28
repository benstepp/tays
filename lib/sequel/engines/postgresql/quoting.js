class Quoting {
  quote_column_name(column_name) {
    return this.quote_identifier(column_name)
  }

  quote_table_name(table_name) {
    const input = table_name.match(/[^".\s]+|"[^"]*"/g)
    const table = input[1] || input[0]
    const schema = input[1] && input[0]

    let result = ''
    if (schema) { result += `${this.quote_identifier(schema)}.` }
    if (table) { result += this.quote_identifier(table) }
    return result
  }

  quote_identifier(string) {
    return `"${string.replace(/^"(.*)"$/g, '$1')}"`
  }

  quote(string) {
    if (typeof string === 'string') {
      return `\'${this.escape_value(string)}\'`
    } else if (typeof string === 'number') {
      return string
    } else if (typeof string === 'boolean') {
      return (string) ? 'TRUE' : 'FALSE'
    }
  }

  escape_value(string) {
    return string.replace(new RegExp('\'', 'g'), '\'\'')
  }
}

export { Quoting }
