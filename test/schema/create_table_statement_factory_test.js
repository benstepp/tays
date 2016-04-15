import { CreateTableStatementFactory } from '../../lib/schema'
import { includes } from 'lodash'

describe('CreateTableStatementFactory', () => {
  it('returns a CREATE TABLE statement', () => {
    const factory = new CreateTableStatementFactory('users', {}, function() {})
    const statement = factory.statement
    expect(includes(statement, 'CREATE TABLE')).to.eq(true)
  })

  describe('passing a block', () => {
    it('can create columns based on function', () => {
      const factory = new CreateTableStatementFactory('users', {}, function(t) {
        t.primary_key('id')
        t.string('email', { null: true })
        t.boolean('admin', { null: false, default: false })
      })
      const statement = factory.statement
      expect(includes(statement, 'CREATE TABLE')).to.eq(true)
      expect(includes(statement, 'id')).to.eq(true)
      expect(includes(statement, 'email')).to.eq(true)
    })
  })
})
