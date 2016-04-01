class AssociationTransformer {

  constructor(ast = {}) {
    this.associations = ast.associations || {}
    this.association_names = Object.keys(this.associations)
  }

  transform(klass) {
    for (let association of this.association_names) {
      this.define_association_method(association, klass)
      klass.add_reflection(this.associations[association])
    }
  }

  define_association_method(name, klass) {
    Object.defineProperty(klass.prototype, name, this.define_descriptor(name))
    Object.defineProperty(klass.prototype, `build_${name}`, this.build_descriptor(name))
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

  build_descriptor(name) {
    const descriptor = {
      enumerable: false,
      configurable: true,
      value: function(attributes) { return this.build_association(name, attributes) }
    }
    Object.defineProperty(descriptor.value, 'name', { value: `build_${name}` })
    return descriptor
  }
}

export { AssociationTransformer }
