import { ReflectionFactory } from '../../reflection'

class AssociationTransformer {

  constructor(ast = {}) {
    this.associations = ast.associations || {}
    this.association_names = Object.keys(this.associations)
  }

  transform(klass) {
    for (let association of this.association_names) {
      this.define_association_method(association, klass)
      this.create_reflection(klass, this.associations[association])
    }
  }

  create_reflection(klass, definition) {
    const { decorator } = definition
    const reflection = ReflectionFactory[decorator](klass, definition)
    klass.add_reflection(reflection)
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
      value: function(attributes) { return this.association(name).build(attributes) }
    }
    Object.defineProperty(descriptor.value, 'name', { value: `build_${name}` })
    return descriptor
  }

  register() {}
}

export { AssociationTransformer }
