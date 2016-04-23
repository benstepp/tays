/**
 * include is a function which decorates a target class with the static
 * and instance methods of another class.
 *
 * ```js
 * import { include }  from 'tays/meta'
 * import { IncludeableModule, AnotherIncludeable } from '../mixins'
 *
 * @include(IncludableModule, AntherIncludable)
 * class Something {}
 *
 * // Something now has the static and instance methods of
 * // IncludableModule and AnotherIncludeable
 * ```
 *
 * If your environment is not using descorators. The following syntax
 * may be used as an alternative.
 *
 * ```js
 * import { include }  from 'tays/meta'
 * import { IncludeableModule, AnotherIncludeable } from '../mixins'
 *
 * class Something {}
 * include(IncludableModule, AntherIncludable)(Something)
 * ```
*/
export function include(...included) {
  return function decorate(target) {
    if (typeof included !== 'undefined' && included.length > 0) {
      included.forEach(to_include => {
        _include(target, to_include)
        _include(target.prototype, to_include.prototype)
      })
    }
  }
}

/**
 * Copies the Properties from the source class to the target class.
 * Both Symbols and Names are copied.
*/
function _include(klass, to_include) {
  Object.getOwnPropertyNames(to_include).forEach(include_property)
  Object.getOwnPropertySymbols(to_include).forEach(include_property)

  /**
   * Copies a single property of a name or symbol from the source to
   * the target class.
  */
  function include_property(name) {
    if (should_include(name)) {
      const descriptor = Object.getOwnPropertyDescriptor(to_include, name)
      Object.defineProperty(klass, name, descriptor)
    }
  }

  /**
   * Only the non-existing properties are included. Special properties
   * are also ignored.
  */
  function should_include(name) {
    return (
      !Object.hasOwnProperty(klass, name) &&
        ['prototype', 'name', 'constructor'].indexOf(name) === -1
    )
  }
}
