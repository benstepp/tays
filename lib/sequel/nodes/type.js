import { Node } from './node'

class Type extends Node {}
export { Type }

export class Varchar extends Type {
  constructor(length) {
    super()
    this.length = length
  }
}
