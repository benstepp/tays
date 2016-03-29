class AssociationTransformer {

  constructor(ast = {}) {
    this.associations = ast.associations || {}
    this.association_names = Object.keys(this.associations)
  }

  transform(klass) {
    for (let association of this.association_names) {
      this.define_association_method(association, klass)
    }
  }

  define_association_method(name, klass) {
    Object.defineProperty(klass.prototype, name, this.define_descriptor(name))
  }

  define_descriptor(name) {
    const descriptor = {
      enumerable: false,
      configurable: true,
      get: function() { return this.read_association(name) },
      set: function(value) { return this.write_association(name, value) }
    }
    Object.defineProperty(descriptor.get, 'name', { value: `get_${name}` })
    Object.defineProperty(descriptor.set, 'name', { value: `set_${name}` })
    return descriptor
  }

}

export { AssociationTransformer }
