import { ActiveRecord, belongs_to, has_many } from 'lib'
import { Reflection } from 'lib/reflection'
import { BelongsToDefinition } from 'lib/decorators/definitions'

describe('Reflection', () => {
  describe('#reflections', () => {
    it('returns an object', () => {
      expect(Reflection.reflections).to.exist
      expect(Reflection.reflections).to.be.an('object')
    })
  })

  describe('#add_reflection', () => {
    it('can be reflected after being added', () => {
      const association = new BelongsToDefinition('user', {})
      class Post extends ActiveRecord.Base {}

      Post.add_reflection(association)

      expect(Post.reflect_on_association('user')).to.exist
    })

    it('only affects a given class', () => {
      const association = new BelongsToDefinition('user', {})
      class Post extends ActiveRecord.Base {}
      class Stuff extends ActiveRecord.Base {}

      Post.add_reflection(association)

      expect(Post.reflect_on_association('user')).to.exist
      expect(Stuff.reflect_on_association('user')).to.not.exist
    })
  })

  describe('#reflect_on_association', () => {
    it('returns undefined for nonexistent associations', () => {
      class Post extends ActiveRecord.Base {}
      expect(Post.reflect_on_association('user')).to.not.exist
    })
  })

  describe('#reflect_on_all_associations', () => {
    it('returns an array', () => {
      class Post extends ActiveRecord.Base {}
      expect(Post.reflect_on_all_associations()).to.be.a('array')
    })

    it('returns all associations', () => {
      class Role extends ActiveRecord.Base {}
      ActiveRecord(Role).default

      class Post extends ActiveRecord.Base {}
      ActiveRecord(Post).default

      class User extends ActiveRecord.Base {
        @belongs_to('role')
        @has_many('posts')
        noop() {}
      }
      const _User = ActiveRecord(User).default

      expect(_User.reflect_on_all_associations().length).to.eq(2)
      expect(_User.reflect_on_all_associations('belongs_to').length).to.eq(1)
      expect(_User.reflect_on_all_associations('has_many').length).to.eq(1)
      expect(_User.reflect_on_all_associations('has_one').length).to.eq(0)
    })
  })
})
