import { Node } from './node'

class Type extends Node {}

class LengthType extends Node {
  constructor(length) {
    super()
    this.length = length
  }
}

export class TypeBoolean extends Type {}
export class TypeDate extends Type {}
export class TypeDatetime extends Type {}
export class TypeDecimal extends Type {}
export class TypeFloat extends Type {}
export class TypeInteger extends Type {}
export class TypePrimaryKey extends Type {}
export class TypeText extends Type {}
export class TypeTime extends Type {}
export class TypeVarchar extends LengthType {}
