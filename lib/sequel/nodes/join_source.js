import { BinaryNode } from './binary'

class JoinSource extends BinaryNode {

  constructor(source, join_operands = []) {
    super(source, join_operands)
  }

  get empty() {
    return !this.left && this.right.empty
  }
}

export { JoinSource }
