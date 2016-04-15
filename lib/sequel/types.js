import * as ColumnTypes from './nodes/type'
import i from 'i'
const Inflector = i()

class Types {}

for (const key in ColumnTypes) {
  const type = ColumnTypes[key]
  const method_name = Inflector.underscore(key.substr(4))
  define_type_method(method_name, type)
}

function define_type_method(method_name, Type) {
  Object.defineProperty(
    Types.prototype,
    method_name,
    {
      value: function(arg) {
        this.type = new Type(arg)
        return this
      }
    }
  )
}

export { Types }
