import ActiveRecord from '../../lib'

describe('Migration', () => {
  it('saves off statements', () => {
    class TestMigration extends ActiveRecord.Migration {
      change() {
        this.create_table('users', t => {
          t.string('email')
        })
      }
    }

    const migration = new TestMigration()
    expect(migration.statements.length > 0).to.eq(true)
  })
})
