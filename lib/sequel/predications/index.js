import { Quoted } from '../nodes'
import { build_quoted } from '../nodes'
import { InPredications } from './in_predications'
import { EqualPredications } from './equal_predications'
import { LessThanPredications } from './less_than_predications'
import { GreaterThanPredications } from './greater_than_predications'
import { include } from '../../meta'

@include(
  InPredications,
  EqualPredications,
  LessThanPredications,
  GreaterThanPredications
)
class Predications {

  grouping_any(method, others, ...extras) {
    // TODO
  }

  grouping_all(method, others, ...extras) {

  }

  equals_quoted(maybe_quoted, value) {
    if (maybe_quoted instanceof Quoted) {
      return maybe_quoted.value === value
    } else {
      return maybe_quoted === value
    }
  }

  quoted_array(nodes) {
    return nodes.map(node => {
      return this.quoted_node(node)
    })
  }

  quoted_node(node) {
    return build_quoted(node)
  }

}

export { Predications }
export * from './alias_predication'
export * from './order_predications'
