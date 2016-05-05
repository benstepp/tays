import { Migrator } from '../../lib/migrations'
import { ActiveRecord } from '../../lib'

describe('Migrator', () => {
  beforeEach(() => {
    Migrator.reset()
  })

  describe('migration_paths', () => {
    it('returns an array of string', () => {
      expect(Migrator.migration_paths).to.be.an('array')
    })

    it('contains the default of "db/migrate"', () => {
      expect(Migrator.migration_paths).to.include('db/migrate')
    })

    it('can be added to', () => {
      Migrator.migration_paths.push('server/db/migrate')

      expect(Migrator.migration_paths).to.include('server/db/migrate')
      expect(Migrator.migration_paths).to.include('db/migrate')
    })
  })

  describe('load_migrations', () => {
    it('loads all migrations in the migration paths', async () => {
      Migrator.migration_paths.push('test/fixtures/migrate')
      await Migrator.load_migrations()
      expect(Migrator.migrations).to.be.an('array')
    })

    it('automatically adds versions to the migrations', async () => {
      Migrator.migration_paths.push('test/fixtures/migrate')
      await Migrator.load_migrations()
      Migrator.migrations.forEach(migration => {
        expect(migration.version).to.exist
        expect(migration.version).to.be.a('number')
      })
    })
  })

  describe('last version', () => {
    it('returns a number', async () => {
      Migrator.migration_paths.push('test/fixtures/migrate')
      await Migrator.load_migrations()
      expect(Migrator.last_version).to.exist
      expect(Migrator.last_version).to.be.a('number')
    })

    it('returns undefined when no migrations are present', async () => {
      Migrator.migration_paths.push('test/fixtures/migrate')
      await Migrator.load_migrations()
      Migrator.migrations = []
      expect(Migrator.last_version).to.not.exist
    })
  })

  describe('last migration', () => {
    it('returns the last migration', async () => {
      Migrator.migration_paths.push('test/fixtures/migrate')
      await Migrator.load_migrations()
      const last_version = Migrator.last_version
      expect(Migrator.last_migration.version).to.eq(last_version)
    })
  })
})
