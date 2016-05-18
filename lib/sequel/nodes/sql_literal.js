import { Node } from './node'
import { AliasPredication } from '../predications'
import { Expressions } from '../expressions'
import { include } from '../../meta'

@include(Expressions, AliasPredication)
class SqlLiteral extends Node {

  constructor(string) {
    super()
    this.string = string
  }

  toString() {
    return this.string
  }

}

export { SqlLiteral }
