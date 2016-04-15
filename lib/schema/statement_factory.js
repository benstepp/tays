class StatementFactory {

  get statement() {
    return this.manager.to_sql()
  }

}

export { StatementFactory }
