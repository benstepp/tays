import { UnaryNode } from './unary'
const altered = Symbol()

class Constraint extends UnaryNode {
  get dropped() {
    return this.expression === undefined
  }

  get altered() {
    return this[altered] && !this.dropped
  }

  alter() {
    this[altered] = true
    return this
  }
}

export class NullConstraint extends Constraint {}
export class DefaultConstraint extends Constraint {}
