import { Association } from '../../lib/associations'
import { DecoratorManager } from '../../lib/decorators/decorator_manager'
import { includes } from 'lodash'

describe('DecoratorManager', () => {
  it('exists as a class', () => {
    expect(DecoratorManager).to.exist
    expect(DecoratorManager).to.be.a('function')
    expect(() => DecoratorManager()).to.throw(TypeError)
  })

  describe('#add_association', () => {
    it('adds an association to the list', () => {
      const association = new Association()
      const manager = new DecoratorManager()
      manager.add_association(association)
      expect(includes(manager.associations, association)).to.eq(true)
    })

    it('throws when being called without an Association', () => {
      const manager = new DecoratorManager()
      expect(() => manager.add_association(function() {})).to.throw(Error)
      expect(() => manager.add_association({})).to.throw(Error)
      expect(() => manager.add_association()).to.throw(Error)
      expect(() => manager.add_association(null)).to.throw(Error)
    })
  })
})
