class KlassFactory {

  constructor(klass_name = '', klass_proto = null) {
    this.klass_name = klass_name
    this.klass_proto = klass_proto
    this.generate_klass()
  }

  generate_klass() {
    this.klass = this.new_klass
    this.set_klass_name()
  }

  set_klass_name() {
    Reflect.defineProperty(this.klass, 'name', this.klass_name_descriptor)
  }

  get new_klass() {
    if (this.klass_proto) {
      return class extends this.klass_proto {}
    } else {
      return class {}
    }
  }

  get klass_name_descriptor() {
    return { value: this.klass_name }
  }

}

export { KlassFactory }
