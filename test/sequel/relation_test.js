import { Relation } from '../../lib/sequel'
import { SelectManager } from '../../lib/sequel/managers'
import { Attribute } from '../../lib/sequel/nodes'

describe('Relation', () => {
  it('exists as a class', () => {
    expect(Relation).to.exist
    expect(Relation).to.be.a('function')
  })

  describe('#constructor', () => {
    it('saves off the name passed', () => {
      const users = new Relation('users')
      expect(users.name).to.equal('users')
    })
  })

  describe('#project', () => {
    it('returns a SelectManager', () => {
      const users = new Relation('users')
      const manager = users.project('*')
      expect(manager).to.be.instanceof(SelectManager)
    })

    it('has a to_sql method', () => {
      const users = new Relation('users')
      const manager = users.project('*')
      expect(manager.to_sql).to.be.a('function')
    })
  })

  describe('#column', () => {
    it('returns an Attribute', () => {
      const users = new Relation('users')
      const col = users.column('email')
      expect(col).to.be.instanceof(Attribute)
    })
  })
})
