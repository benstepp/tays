import { PrototypeChain } from 'lib/meta'
import { last } from 'lodash'
import { isEqual as match_array } from 'lodash'
import { head as first } from 'lodash'

class ParentClass {}
class ChildClass extends ParentClass {}

describe('PrototypeChain', () => {
  it('exists as a class', () => {
    expect(PrototypeChain).to.exist
    expect(PrototypeChain).to.be.a('function')
  })

  describe('#constructor', () => {
    it('returns an array', () => {
      const chain = new PrototypeChain(ParentClass)
      expect(chain).to.be.a('array')
    })

    it('can be called statically', () => {
      expect(() => PrototypeChain.new(ParentClass)).to.not.throw(Error)
    })

    it('returns the same thing when called statically', () => {
      const chain_a = new PrototypeChain(ParentClass)
      const chain_b = PrototypeChain.new(ParentClass)
      expect(match_array(chain_a, chain_b)).to.eq(true)
    })
  })

  describe('returned chain', () => {
    it('stops at null', () => {
      const parent_chain = new PrototypeChain(ParentClass)
      const child_chain = new PrototypeChain(ChildClass)
      expect(last(parent_chain)).to.eq(null)
      expect(last(child_chain)).to.eq(null)
    })

    it('is one longer for a child class', () => {
      const parent_chain = new PrototypeChain(ParentClass)
      const child_chain = new PrototypeChain(ChildClass)
      expect(child_chain.length).to.eq(parent_chain.length + 1)
    })

    it('contains the parent class if a subclass', () => {
      const child_chain = new PrototypeChain(ChildClass)
      expect(child_chain).to.include(ParentClass)
    })
  })

  describe('compatability with native types:', () => {
    compatable_with(Array)
    compatable_with(Boolean)
    compatable_with(Function)
    compatable_with(Int8Array)
    compatable_with(Int16Array)
    compatable_with(Int32Array)
    compatable_with(Float32Array)
    compatable_with(Float64Array)
    compatable_with(JSON)
    compatable_with(Map)
    compatable_with(Number)
    compatable_with(Object)
    compatable_with(Proxy)
    compatable_with(Set)
    compatable_with(String)
    compatable_with(Symbol)
    compatable_with(Uint8Array)
    compatable_with(Uint16Array)
    compatable_with(Uint32Array)
    compatable_with(Uint8ClampedArray)
    compatable_with(WeakMap)
    compatable_with(WeakSet)
    compatable_with(null)
  })

  function compatable_with(klass) {
    it(`doesnt throw on ${klass}`, () => {
      expect(() => new PrototypeChain(klass)).to.not.throw(Error)
    })

    it(`returns an array for a ${klass}`, () => {
      const chain = new PrototypeChain(klass)
      expect(chain).to.be.a('array')
    })

    it('has null as the last item in the chain', () => {
      const chain = new PrototypeChain(klass)
      expect(last(chain)).to.eq(null)
    })

    it(`has ${klass} as first item in the chain`, () => {
      const chain = new PrototypeChain(klass)
      expect(first(chain)).to.eq(klass)
    })
  }
})
