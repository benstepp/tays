import { LessThan } from '../nodes'
import { LessThanOrEqual } from '../nodes'

class LessThanPredications {

  lt(other) {
    return new LessThan(this, this.quoted_node(other))
  }

  lt_any(others) {
    return this.grouping_any('lt', others)
  }

  lt_all(others) {
    return this.grouping_all('lt', others)
  }

  lteq(other) {
    return new LessThanOrEqual(this, this.quoted_node(other))
  }

  lteq_any(others) {
    return this.grouping_any('lteq', others)
  }

  lteq_all(others) {
    return this.grouping_all('lteq', others)
  }

}

export { LessThanPredications }
