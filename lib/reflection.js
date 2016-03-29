class Reflection {

  static get reflections() {
    this.reset_reflections()
    return this.__reflections
  }

  static reset_reflections() {
    if (this.__reflections === undefined) {
      this.__reflections = {}
    }
  }

  static add_reflection(association) {
    this.reflections[association.name] = association
  }

  static reflect_on_association(association_name) {
    return this.reflections[association_name]
  }

}

export { Reflection }
