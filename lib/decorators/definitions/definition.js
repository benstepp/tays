import Inflector from 'i'

class Definition {

  constructor(name, options) {
    this.name = name
    this.options = options
  }

  get target_name() {
    return Inflector().camelize(this.name)
  }

}

export { Definition }
