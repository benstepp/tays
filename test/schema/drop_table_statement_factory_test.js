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

  it('can not cascade', () => {
    const factory = new DropTableStatementFactory('users', { cascade: false })
    const statement = factory.statement
    expect(includes(statement, 'CASCADE')).to.eq(false)
  })

  it('can restrict', () => {
    const factory = new DropTableStatementFactory('users', { restrict: true })
    const statement = factory.statement
    expect(includes(statement, 'RESTRICT')).to.eq(true)
  })

  it('can if exists', () => {
    const factory = new DropTableStatementFactory('users', { if_exists: true })
    const statement = factory.statement
    expect(includes(statement, 'IF EXISTS')).to.eq(true)
  })
})
