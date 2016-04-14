import { Node } from './node'

class Type extends Node {}
export { Type }

export class TypeVarchar extends Type {
  constructor(length) {
    super()
    this.length = length
  }
}

export class TypeDate extends Type {}
