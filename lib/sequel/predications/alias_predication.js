import { As } from '../nodes'
import { SqlLiteral } from '../nodes'

class AliasPredication {
  as(alias) {
    return new As(this, new SqlLiteral(alias))
  }
}

export { AliasPredication }
