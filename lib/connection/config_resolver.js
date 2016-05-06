import { adapter_for } from '../adapters'
import { parse } from 'url'
import { last } from 'lodash'
const resolve_string = Symbol('resolve_string')
const resolve_object = Symbol('resolve_object')
const adapter = Symbol('adapter')
const pool = Symbol('pool')
const username = Symbol('username')
const password = Symbol('password')
const hostname = Symbol('hostname')
const port = Symbol('port')
const database = Symbol('database')

class ConfigResolver {
  constructor(query) {
    if (typeof query === 'string') this[resolve_string](query)
    if (typeof query === 'object') this[resolve_object](query)
  }

  [resolve_string](query) {
    const url = parse(query)
    this[adapter] = url.protocol.slice(0, -1)
    this[username] = url.auth.split(':')[0]
    this[password] = url.auth.split(':')[1]
    this[hostname] = url.hostname
    this[port] = url.pathname.split('/')[1].slice(1)
    this[database] = last(url.pathname.split('/'))
  }

  [resolve_object](query) {
    this[pool] = query.pool
  }

  get url() {
    return `${this[adapter]}://${this[username]}:${this[password]}@${this[hostname]}:${this[port]}/${this[database]}`
  }

  get adapter() {
    return this[adapter]
  }

  get username() {
    return this[username]
  }

  get password() {
    return this[password]
  }

  get hostname() {
    return this[hostname]
  }

  get post() {
    return this[port]
  }

  get database() {
    return this[database]
  }

  to_object() {
    return {
      adapter: this[adapter],
      username: this[username],
      password: this[password],
      hostname: this[hostname],
      port: this[port],
      database: this[database],
      pool: this[pool]
    }
  }

  get connection() {
    return new (adapter_for(this[adapter]))(this)
  }

}

export { ConfigResolver }
