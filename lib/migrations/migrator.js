import { Base } from '../base'
import { MigrationLoader } from './migration_loader'
import { find, map } from 'lodash'
const migration_paths = Symbol()
const last_version = Symbol()
const last_migration = Symbol()

class Migrator {

  static get migration_paths() {
    if (this[migration_paths] === undefined) {
      this[migration_paths] = []
    }
    return this[migration_paths]
  }

  static reset() {
    this[migration_paths] = [ 'db/migrate' ]
    this[last_version] = undefined
    this.migrations = undefined
  }

  static async load_migrations() {
    const loader = new MigrationLoader(this.migration_paths)
    await loader.load()
    this.migrations = loader.migrations
    return this.migrations
  }

  static get last_version() {
    const versions = map(this.migrations, 'version')
    if (versions.length > 0 && !this[last_version]) {
      this[last_version] = Math.max.apply(Math, versions)
    }
    return this[last_version]
  }

  static get last_migration() {
    if (this[last_migration] === undefined) {
      this[last_migration] = find(this.migrations, m => m.version === this.last_version)
    }
    return this[last_migration]
  }

  static get connection() {
    return Base.connection
  }

}

export { Migrator }
