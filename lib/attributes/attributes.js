import { each } from 'lodash'
import { AttributeSet } from './attribute_set'
const instance_attributes = new WeakMap()
const attributes = Symbol('attributes')

/**
 * The Attributes class handles the assignment of attributes in a
 * model. It exposes the minimal methods pososible to read and write
 * model attributes.
 *
 * @mixin Attributes
 */
class Attributes {
  get [attributes]() {
    if (!instance_attributes.has(this)) {
      const columns = this.constructor.columns
      instance_attributes.set(this, new AttributeSet(columns))
    }
    return instance_attributes.get(this)
  }

  get attributes() {
    return this[attributes].to_object()
  }

  assign_attributes(attributes = {}) {
    each(attributes, (value, key) => {
      this[key] = value
    })
  }

  read_attribute(name) {
    return this[attributes].get(name)
  }

  write_attribute(name, value) {
    return this[attributes].set(name, value)
  }
}

export { Attributes }
