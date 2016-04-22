import { Node } from './node'

class BinaryNode extends Node {
  constructor(left, right) {
    super()
    this.left = left
    this.right = right
  }

  get abstract_node() {
    this.constructor.name === 'BinaryNode'
  }
}

export { BinaryNode }
export class As extends BinaryNode {}
export class Assignment extends BinaryNode {}
export class Between extends BinaryNode {}
export class Equality extends BinaryNode {}
export class Except extends BinaryNode {}
export class GreaterThan extends BinaryNode {}
export class GreaterThanOrEqual extends BinaryNode {}
export class In extends BinaryNode {}
export class Intersect extends BinaryNode {}
export class Join extends BinaryNode {}
export class LessThan extends BinaryNode {}
export class LessThanOrEqual extends BinaryNode {}
export class NotEqual extends BinaryNode {}
export class NotIn extends BinaryNode {}
export class Or extends BinaryNode {}
export class RenameColumn extends BinaryNode {}
export class Union extends BinaryNode {}
export class UnionAll extends BinaryNode {}
