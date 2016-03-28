class FactoryMethods {

  create_join(to, constraint = null, Klass) {
    return new Klass(to, constraint)
  }

}

export { FactoryMethods }
