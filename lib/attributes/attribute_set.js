import { each, concat, uniq, map, fromPairs as to_object } from 'lodash'
const raw = Symbol('raw_attributes')
const casted = Symbol('casted_attributes')
const needs_casted = Symbol('needs casted')
const last_touched = Symbol('last_touched')
const cast_attribute = Symbol('cast_attribute')
const maybe_cast_attribute = Symbol('maybe_cast_attribute')
const type_casters = Symbol('type_casters')

class AttributeSet {
  constructor(casters = new Map()) {
    this[type_casters] = casters
    this[raw] = {}
    this[casted] = {}
    this[last_touched] = {}
  }

  get(name) {
    this[maybe_cast_attribute](name)
    return this[casted][name]
  }

  set(name, value) {
    this[raw][name] = value
    this[last_touched][name] = raw
  }

  assign(object) {
    each(object, (key, val) => {
      this.set(key, val)
    })
  }

  get keys() {
    const raw_keys = Object.keys(this[raw])
    const casted_keys = Object.keys(this[casted])
    return uniq(concat(raw_keys, casted_keys))
  }

  [maybe_cast_attribute](name) {
    if (this[needs_casted](name)) {
      this[cast_attribute](name)
    }
  }

  [needs_casted](name) {
    return this[last_touched][name] !== casted
  }

  [cast_attribute](name) {
    const caster = this[type_casters].get(name)
    const previous = this[raw][name]
    if (caster !== undefined) {
      this[casted][name] = caster.cast(previous)
    } else {
      this[casted][name] = previous
    }
  }

  to_object() {
    return to_object(map(this.keys, key => {
      return [key, this.get(key)]
    }))
  }

  inspect() {
    return `AttributeSet ${JSON.stringify(this.to_object())}`
  }
}

export { AttributeSet }
