import ActiveRecord from 'lib'
import { includes } from 'lodash'

class TestMigration extends ActiveRecord.Migration {
  change() {
    this.create_table('users', t => {
      t.string('email')
    })

    this.add_column('users', 'encrypted_password', 'string')
  }
}

describe('Migration', () => {
  it('saves off statements', () => {
    const migration = new TestMigration()
    expect(migration.statements.length > 0).to.eq(true)
  })

  it('has a create table statement', () => {
    const migration = new TestMigration()
    const first = migration.statements[0]
    const second = migration.statements[1]
    expect(includes(first, 'CREATE TABLE'))
    expect(includes(second, 'ALTER TABLE'))
  })
})
