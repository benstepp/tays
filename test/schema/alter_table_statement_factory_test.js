import { AlterTableStatementFactory } from 'lib/schema'
import { includes } from 'lodash'

describe('AlterTableStatementFactory', () => {
  it('returns an ALTER TABLE statement', () => {
    const factory = new AlterTableStatementFactory('users', {}, function() {})
    const statement = factory.statement
    expect(includes(statement, 'ALTER TABLE')).to.eq(true)
  })

  it('can add columns', () => {
    const factory = new AlterTableStatementFactory('users', {}, t => {
      t.string('email')
    })
    const statement = factory.statement
    expect(includes(statement, 'ALTER TABLE')).to.eq(true)
    expect(includes(statement, 'ADD COLUMN')).to.eq(true)
    expect(includes(statement, 'email')).to.eq(true)
  })

  it('can rename a table', () => {
    const factory = new AlterTableStatementFactory('users', {}, t => {
      t.rename('things')
    })
    const statement = factory.statement
    expect(includes(statement, 'ALTER TABLE')).to.eq(true)
    expect(includes(statement, 'RENAME TO')).to.eq(true)
    expect(includes(statement, '"things"')).to.eq(true)
  })

  it('can rename a column', () => {
    const factory = new AlterTableStatementFactory('users', {}, t => {
      t.rename_column('things', 'stuffs')
    })
    const statement = factory.statement
    expect(includes(statement, 'ALTER TABLE')).to.eq(true)
    expect(includes(statement, 'RENAME COLUMN')).to.eq(true)
    expect(includes(statement, '"stuffs"')).to.eq(true)
    expect(includes(statement, 'TO')).to.eq(true)
    expect(includes(statement, '"things"')).to.eq(true)
  })
})
