import { Average } from './nodes'
import { Count } from './nodes'
import { Maximum } from './nodes'
import { Minimum } from './nodes'
import { Sum } from './nodes'

class Expressions {

  count(distinct = false) {
    return new Count([this], distinct)
  }

  max() {
    return this.maximum()
  }

  maximum() {
    return new Maximum([this])
  }

  min() {
    return this.minimum()
  }

  minimum() {
    return new Minimum([this])
  }

  avg() {
    return this.average()
  }

  average() {
    return new Average([this])
  }

  sum() {
    return new Sum([this])
  }

  extract(field) {

  }

}

export { Expressions }
