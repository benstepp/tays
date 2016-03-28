import { GreaterThan } from '../nodes'
import { GreaterThanOrEqual } from '../nodes'

class GreaterThanPredications {

  gt(other) {
    return new GreaterThan(this, this.quoted_node(other))
  }

  gt_any(others) {
    return this.grouping_any('gt', others)
  }

  gt_all(others) {
    return this.grouping_all('gt', others)
  }

  gteq(other) {
    return new GreaterThanOrEqual(this, this.quoted_node(other))
  }

  gteq_any(others) {
    return this.grouping_any('gteq', others)
  }

  gteq_all(others) {
    return this.grouping_all('gteq', others)
  }

}

export { GreaterThanPredications }
