import { Registry } from '../registry'
import i from 'i'

const Inflector = i()

class AbstractReflection {

  constructor(name, options = {}, owner) {
    this.name = name
    this.options = options
    this.owner = owner
  }

  build_association(attributes) {
    return new this.target(attributes) // eslint-disable-line new-cap
  }

  get class_name() {
    return this.options.class_name || Inflector.classify(this.name)
  }

  get target() {
    return Registry.get_model(this.class_name)
  }

  get foreign_key() {
    if (this.__foreign_key === undefined) {
      this.__foreign_key = this.options.foreign_key || this.derive_foreign_key
    }
    return this.__foreign_key
  }

  get derive_foreign_key() {
    if (this.belongs_to) {
      return `${this.name}_id`
    } else if (this.options.as !== undefined) {
      return `${this.options.as}_id`
    } else {
      return Inflector.foreign_key(this.owner.name)
    }
  }

}

export { AbstractReflection }
