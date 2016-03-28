import { UnaryNode } from './unary'

class Quoted extends UnaryNode {

  constructor(expression) {
    super()
    this.expression = expression
  }

  get is_null() {
    return this.expression === null
  }
}

export { Quoted }
