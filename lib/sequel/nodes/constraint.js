import { UnaryNode } from './unary'

class Constraint extends UnaryNode {}

export class NullConstraint extends Constraint {}
export class DefaultConstraint extends Constraint {}
