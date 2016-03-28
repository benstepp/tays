import { In } from '../nodes'

class InPredications {

  in(...expressions) {
    return new In(this, this.quoted_array(expressions))
  }

  in_any(others) {
    return this.grouping_any('in', others)
  }

  in_all(others) {
    return this.grouping_all('in', others)
  }

  not_in() {
    // TODO
  }

  not_in_any(others) {
    return this.grouping_any('not_in', others)
  }

  not_in_all(others) {
    return this.grouping_all('not_in', others)
  }

}

export { InPredications }
