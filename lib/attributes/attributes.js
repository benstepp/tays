import { AttributeSet } from './attribute_set'
const instance_attributes = new WeakMap()
const attributes = Symbol('attributes')

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

  read_attribute(name) {
    return this[attributes].get(name)
  }

  write_attribute(name, value) {
    return this[attributes].set(name, value)
  }
}

export { Attributes }
