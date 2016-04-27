import { ActiveRecord } from '../../lib'
import { include } from '../../lib/meta'
import { Callbacks } from '../../lib/callbacks'
import { CallbackManager } from '../../lib/callbacks'

describe('Callbacks', () => {
  describe('#callback_manager', () => {
    it('can return a callback manager', () => {
      @include(Callbacks)
      class A {}
      expect(A.callback_manager).to.be.instanceof(CallbackManager)
    })

    it('returns a different manager for a different class', () => {
      @include(Callbacks)
      class A {}

      @include(Callbacks)
      class B {}

      expect(A.callback_manager).to.not.eq(B.callback_manager)
    })

    it('returns a different manager for different extended classes', () => {
      class A extends ActiveRecord.Base {}
      class B extends ActiveRecord.Base {}

      expect(A.callback_manager).to.not.eq(B.callback_manager)
    })
  })
})
