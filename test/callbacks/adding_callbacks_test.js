import { ActiveRecord } from 'lib'
import { before_validation } from 'lib'

describe('AddingCallbacks', () => {
  it('adds the callbacks', () => {
    class Stuff extends ActiveRecord.Base {
      @before_validation
      do_stuff() {}
    }
    const _Stuff = ActiveRecord(Stuff).default
    expect(_Stuff.get_callbacks('before_validation').length).to.eq(1)
  })
})
