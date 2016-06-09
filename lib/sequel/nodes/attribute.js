import { Node } from './node'
import { Value } from './binary'
import { Predications } from '../predications'
import { AliasPredication } from '../predications'
import { OrderPredications } from '../predications'
import { Expressions } from '../expressions'
import { include } from '../../meta'

@include(Predications, Expressions, AliasPredication, OrderPredications)
class Attribute extends Node {
  constructor(table, attribute_name) {
    super()
    this.relation = table
    this.name = attribute_name
    this.set_quantifier = null
  }

  value(value) {
    return new Value(this, this.quoted_node(value))
  }
}

export { Attribute }
