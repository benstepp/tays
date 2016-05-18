import { ActiveRecord, belongs_to } from 'lib'

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

  describe('build_association method', () => {
    it('can build the associated model', () => {
      class Role extends ActiveRecord.Base {}
      const _Role = ActiveRecord(Role).default

      class User extends ActiveRecord.Base {
        @belongs_to('role')
        noop() {}
      }
      const _User = ActiveRecord(User).default

      const user = new _User()
      const role = user.build_role({})
      expect(role).to.be.instanceof(_Role)
    })
  })
})
