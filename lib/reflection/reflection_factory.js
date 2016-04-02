import { BelongsToReflection } from './belongs_to_reflection'
import { HasManyReflection } from './has_many_reflection'
import { HasOneReflection } from './has_one_reflection'
import { HasAndBelongsToManyReflection } from './has_and_belongs_to_many_reflection'

class ReflectionFactory {

  static belongs_to(owner, definition) {
    return new BelongsToReflection(definition.name, definition.options, owner)
  }

  static has_many(owner, definition) {
    return new HasManyReflection(definition.name, definition.options, owner)
  }

  static has_one(owner, definition) {
    return new HasOneReflection(definition.name, definition.options, owner)
  }

  static has_and_belongs_to_many(owner, definition) {
    return new HasAndBelongsToManyReflection(definition.name, definition.options, owner)
  }

}

export { ReflectionFactory }
