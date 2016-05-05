import { ConfigResolver } from './config_resolver'

let connection
class ConnectionHandling {

  static async configure(options) {
    const config = new ConfigResolver(options)
    connection = config.connection
    await connection.connect()
    await this.init_internals()
  }

  static get connection() {
    if (!connection) {
      throw new Error()
    }
    return connection
  }

  get connection() {
    return this.constructor.connection
  }

}

export { ConnectionHandling }
