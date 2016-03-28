import { Node } from './node'
import { AliasPredication } from '../predications'
import { Expressions } from '../expressions'
import { include } from '../../meta'

@include(Expressions, AliasPredication)
class SqlLiteral {

  constructor(string) {
    this.string = string
  }

  accept(visitor, collector) {
    collector.push(this.string)
  }

  toString() {
    return this.string
  }

}

export { SqlLiteral }
