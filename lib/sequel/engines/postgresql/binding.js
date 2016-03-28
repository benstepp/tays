class Binding {

  add_bind() {
    this.initialize_binds()
    this.increment_bind()
    return `$${this.bind_count}`
  }

  initialize_binds() {
    if (this.bind_count === undefined) {
      this.bind_count = 0
    }
  }

  increment_bind() {
    this.bind_count += 1
  }

}

export { Binding }
