import { Equality } from '../nodes'
import { NotEqual } from '../nodes'

class EqualPredications {
  equal(other) {
    return new Equality(this, this.quoted_node(other))
  }

  equal_any(others) {
    return this.grouping_any('equal', others)
  }

  equal_all(others) {
    return this.grouping_all('equal', others)
  }

  not_equal(other) {
    return new NotEqual(this, this.quoted_node(other))
  }

  not_equal_any(others) {
    return this.grouping_any('not_equal', others)
  }

  not_equal_all(others) {
    return this.grouping_all('not_equal', others)
  }
}

export { EqualPredications }
