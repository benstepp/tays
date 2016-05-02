import { each, concat, uniq, map, fromPairs as to_object } from 'lodash'
const raw = Symbol('raw_attributes')
const casted = Symbol('casted_attributes')
const needs_casted = Symbol('needs casted')
const last_touched = Symbol('last_touched')
const cast_attribute = Symbol('cast_attribute')
const maybe_cast_attribute = Symbol('maybe_cast_attribute')
const type_casters = Symbol('type_casters')

/**
 * An AttributeSet is an class which stores the attributes of a model.
 * It handles the lazy typecasting of attributes when requested by the
 * user at runtime.
 *
 * @class AttributeSet
 */
class AttributeSet {
  /**
   * Construct a new instance of an AttributeSet. Any object which
   * responds to the interface of a native JavaScript Map may be used
   * to provide typecasters for the attributes.
   *
   * @param {Map|Object} [casters] - A Map like collection of objects
   * which respond to the #cast(value) method.
   *
   * @constructor
   * @constructs AttributeSet
   */
  constructor(casters = new Map()) {
    this[type_casters] = casters
    this[raw] = {}
    this[casted] = {}
    this[last_touched] = {}
  }

  /**
   * Gets an attribute by name casted correctly.
   *
   * @param {string} name - The name of the attribute to get
   */
  get(name) {
    this[maybe_cast_attribute](name)
    return this[casted][name]
  }

  /**
   * Sets an attribute by name. If a typecaster is not available, the
   * value is written directly to the casted values.
   *
   * @param {string} name - The name of the attribute to set
   * @param value - The value of the attribute
   */
  set(name, value) {
    if (this[type_casters].has(name)) {
      this[raw][name] = value
      this[last_touched][name] = raw
    } else {
      this[casted][name] = value
    }
  }

  /**
   * Mass Assignment of attributes using an Object like syntax
   *
   * @param {object} object - An object of attributes to assign to this
   * attribute set.
   *
   * @example
   * ```js
   * const attrs = new AttributeSet()
   * attrs.assign({ first_name: 'Ben', last_name: 'Stepp' })
   * attrs.get('first_name') // 'Ben'
   * attrs.get('last_name') // 'Stepp'
   * ```
   */
  assign(object = {}) {
    each(object, (val, key) => {
      this.set(key, val)
    })
  }

  /**
   * Get the keys of the attributes currently stored in the
   * AttributeSet.
   *
   * @returns Array
   */
  get keys() {
    const raw_keys = Object.keys(this[raw])
    const casted_keys = Object.keys(this[casted])
    return uniq(concat(raw_keys, casted_keys))
  }

  /**
   * Checks if an attribute needs to be typecasted for runtime, and
   * casts the attribute to be read by the runtime.
   *
   * @private
   * @param {string} name - The name of the attribute to check
   */
  [maybe_cast_attribute](name) {
    if (this[needs_casted](name)) {
      this[cast_attribute](name)
    }
  }

  /**
   * A boolean check to typecast an attribute.
   *
   * @private
   * @param {string} name - The name of the attribute to check
   * @returns Boolean
   */
  [needs_casted](name) {
    return (
      this[type_casters].has(name) &&
      this[last_touched][name] !== casted
    )
  }

  /**
   * Cast an attribute using a typecaster. This method will only be
   * called if a typecaster is available.
   *
   * @private
   * @param {string} name - The name of the attribute to typecast
   */
  [cast_attribute](name) {
    const caster = this[type_casters].get(name)
    const previous = this[raw][name]
    this[casted][name] = caster.cast(previous)
  }

  /**
   * A helper method to retrieve all attributes casted for the runtime.
   *
   * @returns Object
   */
  to_object() {
    return to_object(map(this.keys, key => {
      return [key, this.get(key)]
    }))
  }

  /**
   * An override for the default inspect method for console.log().
   *
   * @returns String
   */
  inspect() {
    return `AttributeSet ${JSON.stringify(this.to_object())}`
  }
}

export { AttributeSet }
