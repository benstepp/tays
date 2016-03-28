import { PlainString } from './plain_string'

class SqlString extends PlainString {

  constructor(engine) {
    super()
    this.engine = engine
  }

  add_bind() {
    const value = this.engine.add_bind()
    this.push(value)
  }

}

export { SqlString }
