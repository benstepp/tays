import { MigrationLoader } from './migration_loader'
import { find, map } from 'lodash'

class Migrator {

  static get migration_paths() {
    if (this.__migration_paths === undefined) {
      this.__migration_paths = []
    }
    return this.__migration_paths
  }

  static reset() {
    this.__migration_paths = [ 'db/migrate' ]
    this.__last_version = undefined
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
    if (versions.length > 0 && !this.__last_version) {
      this.__last_version = Math.max.apply(Math, versions)
    }
    return this.__last_version
  }

  static get last_migration() {
    if (this.__last_migration === undefined) {
      this.__last_migration = find(this.migrations, m => m.version === this.last_version)
    }
    return this.__last_migration
  }

}

export { Migrator }
