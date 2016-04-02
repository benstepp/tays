import Inflector from 'i'

class Definition {

  constructor(name, options) {
    this.name = name
    this.options = options
  }

  get target_name() {
    return this.options.class_name || Inflector().classify(this.name)
  }

}

export { Definition }
