import { DropTableStatementFactory } from '../../lib/schema'
import { includes } from 'lodash'

describe('DropTableStatementFactory', () => {
  it('returns a DROP TABLE statement', () => {
    const factory = new DropTableStatementFactory('users')
    const statement = factory.statement
    expect(includes(statement, 'DROP TABLE')).to.eq(true)
  })

  it('cascades by default', () => {
    const factory = new DropTableStatementFactory('users')
    const statement = factory.statement
    expect(includes(statement, 'CASCADE')).to.eq(true)
  })
})
