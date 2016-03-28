import { ActiveRecord, belongs_to, Meta } from '../../lib'

describe('belongs_to', () => {
  it('adds getters and setters on the klass with the name of the relation', () => {
    class User extends ActiveRecord.Base {
      @belongs_to('role')
      noop() {}
    }

    const _User = ActiveRecord(User).default
    const user = new _User()
    expect(user.role).to.exist
  })
})
