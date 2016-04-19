import { AlterTableStatementFactory } from '../../lib/schema'
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
})
