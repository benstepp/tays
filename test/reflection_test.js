import { ActiveRecord } from '../lib'
import { Reflection } from '../lib/reflection'
import { BelongsToDefinition } from '../lib/decorators/definitions'

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
})
