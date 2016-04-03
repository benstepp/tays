import Path from 'path'
import { promisify, all } from 'bluebird'
import { flatten } from 'lodash'
import g from 'glob'
const glob = promisify(g)

class MigrationLoader {

  constructor(paths) {
    this.paths = this.resolve_paths(paths)
  }

  resolve_paths(paths) {
    return paths
    .map(path => Path.resolve(process.cwd(), path))
    .map(path => `${path}/*.js`)
  }

  async load() {
    const promises = this.paths.map(path => glob(path))
    this.files = flatten(await all(promises))
    this.require_migrations()
  }

  require_migrations() {
    this.migrations = this.files.map(file => {
      return this.require_migration(file)
    })
  }

  require_migration(file) {
    const exports = require(file)
    const migration = this.define_migration(file, exports)
    return migration
  }

  define_migration(file, exports) {
    const best_guess_key = Object.keys(exports)[0]
    const migration = exports[best_guess_key]
    Object.defineProperty(migration, 'version', this.version_descriptor(file))
    return migration
  }

  version_descriptor(file) {
    const version = Number(file.match(/\d{12,12}/)[0])
    return {
      configurable: true,
      enumerable: false,
      get: function get_version() { return version }
    }
  }

}

export { MigrationLoader }
