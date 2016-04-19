import { Attribute } from './attribute'
import { BindParam } from './node'
import { Node } from './node'
import { Quoted } from './quoted'
import { SelectManager } from '../managers'
import { Relation } from '../relation'

function instanceof_check(item) {
  let check = false
  const others = [Attribute, Node, Quoted, SelectManager, Relation, BindParam]
  others.forEach(constructor => {
    if (item instanceof constructor) { check = true }
  })
  return check
}

function build_quoted(other, attribute = null) {
  if (instanceof_check(other)) { return other }
  if (attribute && attribute.constructor.name === 'Attribute') {
    return // new Casted(other, attribute)
  } else {
    return new Quoted(other)
  }
}

export { build_quoted }
export * from './node'
export * from './and'
export * from './attribute'
export * from './binary'
export * from './column'
export * from './delete_statement'
export * from './function'
export * from './join'
export * from './join_source'
export * from './select_core'
export * from './select_statement'
export * from './sql_literal'
export * from './type'
export * from './unary'
export * from './alter_table_statement'
export * from './create_table_statement'
