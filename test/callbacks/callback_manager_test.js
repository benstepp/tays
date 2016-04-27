import { CallbackManager } from '../../lib/callbacks'
import { spy } from 'sinon'

describe('CallbackManager', () => {
  describe('#get_callbacks', () => {
    it('can return callbacks', () => {
      const manager = new CallbackManager()
      expect(manager.get_callbacks('before_validation')).to.exist
    })
  })

  describe('#set_callback', () => {
    it('can set callbacks', () => {
      const manager = new CallbackManager()
      manager.set_callback('before_validation', 'test')
      expect(manager.get_callbacks('before_validation').length).to.eq(1)
    })

    it('wont add the same callback multiple times', () => {
      const manager = new CallbackManager()
      manager.set_callback('before_validation', 'test')
      manager.set_callback('before_validation', 'test')
      manager.set_callback('before_validation', 'test')
      expect(manager.get_callbacks('before_validation').length).to.eq(1)
    })

    it('can add Symbols', () => {
      const manager = new CallbackManager()
      const symbol_method = Symbol('symbol_method')
      manager.set_callback('before_validation', symbol_method)
      expect(manager.get_callbacks('before_validation').length).to.eq(1)
    })

    it('wont add the same symbol twice', () => {
      const manager = new CallbackManager()
      const symbol_method = Symbol()
      manager.set_callback('before_validation', symbol_method)
      manager.set_callback('before_validation', symbol_method)
      expect(manager.get_callbacks('before_validation').length).to.eq(1)
    })
  })

  describe('#run_callbacks', () => {
    it('calls the callback on the given object', () => {
      const manager = new CallbackManager()
      manager.set_callback('before_validation', 'test')
      const instance = { test: spy() }

      manager.run_callbacks('before_validation', instance)
      expect(instance.test.called).to.eq(true)
      expect(instance.test.callCount).to.eq(1)
    })

    it('can call symbol methods', () => {
      const manager = new CallbackManager()
      const method = Symbol()
      manager.set_callback('before_validation', method)
      const instance = { [method]: spy() }

      manager.run_callbacks('before_validation', instance)
      expect(instance[method].called).to.eq(true)
      expect(instance[method].callCount).to.eq(1)
    })
  })
})
