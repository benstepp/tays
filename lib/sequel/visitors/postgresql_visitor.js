import { Base } from './base'
import { SqlString } from '../collectors'
import { PostgresqlEngine } from '../engines'

class PostgresqlVisitor extends Base {
  constructor() {
    super()
    this.collector =  new SqlString(this.engine)
  }

  get engine() {
    return new PostgresqlEngine()
  }

}

export { PostgresqlVisitor }
