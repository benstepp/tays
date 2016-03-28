import { UnaryNode } from './unary'
import { include } from '../../meta'
import { AliasPredication } from '../predications'

@include(AliasPredication)
class SqlFunction extends UnaryNode {
  constructor(expression, distinct = false) {
    super(expression)
    this.distinct = distinct
  }
}

export { SqlFunction }
export class Count extends SqlFunction {}
export class Average extends SqlFunction {}
export class Maximum extends SqlFunction {}
export class Minimum extends SqlFunction {}
export class Sum extends SqlFunction {}
