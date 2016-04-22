class Node {
  not() {
    const Not = require('./not')
    return new Not(this)
  }

  or(right) {
    const Grouping = require('./grouping')
    const Or = require('./or')
    return new Grouping(new Or(this, right))
  }

  and(right) {
    const And = require('./and')
    return new And([this, right])
  }
}

export { Node }
export class ForShare extends Node {}
export class ForUpdate extends Node {}
export class BindParam extends Node {}
export class False extends Node {}
export class True extends Node {}
export class IfExists extends Node {}
export class Restrict extends Node {}
export class Cascade extends Node {}
