import { UnaryNode } from './unary'

class Constraint extends UnaryNode {
  alter() {
    this.altered = true
    return this
  }
}

export class NullConstraint extends Constraint {}
export class DefaultConstraint extends Constraint {}
