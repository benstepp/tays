export * as Meta from './meta'
export * as Sequel from './sequel'

import { Decorators } from './decorators'
export const has_one = Decorators.has_one
export const has_many = Decorators.has_many
export const belongs_to = Decorators.belongs_to
export const has_and_belongs_to_many = Decorators.has_and_belongs_to_many

import { Base } from './base'
export { Base }
import { Factory } from './factory'
export { Factory }

ActiveRecord.Base = Base
export default ActiveRecord
export function ActiveRecord(klass) {
  const factory = new Factory(klass, Decorators.manager)
  Decorators.reset()
  return factory.exports
}
