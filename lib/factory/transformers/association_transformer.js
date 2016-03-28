class AssociationTransformer {

  constructor(associations) {
    this.associations = associations
  }

  transform(klass) {
    this.associations.forEach(association => {
      const association_name = association.name
      this.define_association_method(association_name, klass)
    })
  }

  define_association_method(name, klass) {
    Object.defineProperty(klass.prototype, name, this.define_descriptor(name))
  }

  define_descriptor(name) {
    return {
      enumerable: false,
      configurable: true,
      get: function() { return this.get_association(name) },
      set: function(value) { return this.set_association(name, value) }
    }
  }

}

export { AssociationTransformer }
