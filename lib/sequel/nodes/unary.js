import { Node } from './node'

class UnaryNode extends Node {
  constructor(expression) {
    super()
    this.expression = expression
  }
}

export { UnaryNode }
export class AddColumn extends UnaryNode {}
export class AlterColumn extends UnaryNode {}
export class Ascending extends UnaryNode {}
export class Binary extends UnaryNode {}
export class Descending extends UnaryNode {}
export class Distinct extends Node {}
export class DropColumn extends UnaryNode {}
export class Group extends UnaryNode {}
export class Limit extends UnaryNode {}
export class Not extends UnaryNode {}
export class Offset extends UnaryNode {}
export class On extends UnaryNode {}
export class Ordering extends UnaryNode {}
export class Top extends UnaryNode {}
export class Lock extends UnaryNode {}
export class DistinctOn extends UnaryNode {}
export class RenameTable extends UnaryNode {}
