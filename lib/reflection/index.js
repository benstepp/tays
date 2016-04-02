import { values } from 'lodash'
import { filter } from 'lodash'

class Reflection {

  static get reflections() {
    this.reset_reflections()
    return this.__reflections
  }

  static reset_reflections() {
    if (this.__reflections === undefined) {
      this.__reflections = {}
    }
  }

  static add_reflection(association) {
    this.reflections[association.name] = association
  }

  static reflect_on_association(association_name) {
    return this.reflections[association_name]
  }

  static reflect_on_all_associations(decorator = false) {
    let all = values(this.reflections)
    if (decorator) { all = filter(all, r => r.decorator === decorator) }
    return all
  }

}

export { Reflection }
export * from './abstract_reflection'
export * from './association_reflection'
export * from './belongs_to_reflection'
export * from './has_many_reflection'
export * from './has_and_belongs_to_many_reflection'
export * from './has_one_reflection'
export * from './reflection_factory'
