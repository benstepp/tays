let pg
try {
  require('pg-native')
  pg = require('pg').native
} catch (error) {
  pg = require('pg')
}

const pg_config = Symbol('pg_config')
const client = Symbol('client')

class PostgresqlAdapter {

  constructor(config_specification) {
    this.config = config_specification
  }

  execute(string, values) {
    this.client.query(string, values)
  }

  async connect() {
    this[client] = new pg.Client(this[pg_config])
    const error = await this.client.connect()
    if (error !== null) throw error
  }

  get client() {
    return new Promise(async (resolve, reject) => {
      if (this[client] === undefined) {
        await this.connect()
        resolve(this[client])
      }
    })
  }

  get [pg_config]() {
    return {
      user: this.config.username,
      password: this.config.password,
      database: this.config.database,
      port: this.config.port,
      host: this.config.hostname,
      poolSize: this.config.pool
    }
  }

}

export { PostgresqlAdapter }
