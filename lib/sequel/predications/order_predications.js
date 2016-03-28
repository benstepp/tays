import { Ascending } from '../nodes'
import { Descending } from '../nodes'

class OrderPredications {
  asc() {
    return new Ascending(this)
  }

  ascending() {
    return new Ascending(this)
  }

  desc() {
    return new Descending(this)
  }

  descending() {
    return new Descending(this)
  }
}

export { OrderPredications }
