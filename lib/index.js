export * as Meta from './meta'
export * as Sequel from './sequel'

import { Decorators } from './decorators'
export const has_one = Decorators.has_one
export const has_many = Decorators.has_many
export const belongs_to = Decorators.belongs_to
export const has_and_belongs_to_many = Decorators.has_and_belongs_to_many
export const after_initialize = Decorators.after_initialize
export const before_validation = Decorators.before_validation
export const after_validation = Decorators.after_validation
export const before_save = Decorators.before_save
export const after_save = Decorators.after_save
export const before_create = Decorators.before_create
export const after_create = Decorators.after_create

import { Registry } from './registry'
import { Base } from './base'
export { Base }
import { Factory } from './factory'
export { Factory }
import { Migration } from './migrations'

ActiveRecord.Migration = Migration
ActiveRecord.Base = Base
export default ActiveRecord
export function ActiveRecord(klass) {
  const factory = new Factory(klass, Decorators.manager)
  Registry.register(factory.klass)
  Decorators.reset()
  return factory.exports
}
