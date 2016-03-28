import { KlassFactory } from '../../lib/meta'
import { PrototypeChain } from '../../lib/meta'
import { isEqual as match_array } from 'lodash'
import { drop } from 'lodash'

describe('KlassFactory', () => {
  it('exists as a class', () => {
    expect(KlassFactory).to.exist
    expect(KlassFactory).to.be.a('function')
    expect(() => KlassFactory()).to.throw(TypeError)
  })

  describe('when not given a prototype', () => {
    it('has a the cooresponding prototype chain', () => {
      const factory = new KlassFactory('Name')
      const chain_a = drop(new PrototypeChain(factory.klass))
      const chain_b = drop(new PrototypeChain(class {}))
      expect(match_array(chain_a, chain_b)).to.eq(true)
    })
  })

  describe('when setting the prototype', () => {
    it('creates instances of that prototype', () => {
      class Proto {}
      const factory = new KlassFactory('a', Proto)
      const Klass = factory.klass
      expect(new Klass()).to.be.instanceof(Klass)
      expect(new Klass()).to.be.instanceof(Proto)
    })
  })

  describe('defining with a name', () => {
    it('sets the name of the returned class', () => {
      const factory = new KlassFactory('Name')
      expect(factory.klass.name).to.eq('Name')

      const factory_b = new KlassFactory('AnotherName')
      expect(factory_b.klass.name).to.eq('AnotherName')
    })

    it('does not set the name if it doesnt have one', () => {
      const factory = new KlassFactory()
      expect(factory.klass.name).to.eq('')
    })

    it('has the same empty name as a class literal', () => {
      const factory = new KlassFactory()
      const a = class {}
      expect(factory.klass.name).to.eq(a.name)
    })
  })
})
