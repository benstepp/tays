/**
 * include is a function which decorates a target class with the static
 * and instance methods of another class. Usage:
 *
 * @include(IncludableModule, AntherIncludable)
 * class Something {}
 *
*/
function include(...included) {
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
 * Copies the Proprerty from the source to the target maintaining the
 * given descriptor from the source.
*/
function _include(klass, to_include) {
  Object.getOwnPropertyNames(to_include).forEach(name => {
    if (should_include(name)) {
      const descriptor = Object.getOwnPropertyDescriptor(to_include, name)
      Object.defineProperty(klass, name, descriptor)
    }
  })

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

export { include }
