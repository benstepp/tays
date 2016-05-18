import { ActiveRecord, belongs_to } from 'lib'
import { AbstractReflection } from 'lib/reflection'

describe('AbstractReflection', () => {
  it('exists as class', () => {
    expect(AbstractReflection).to.exist
    expect(AbstractReflection).to.be.a('function')
    expect(() => AbstractReflection()).to.throw(TypeError)
  })

  describe('#class_name', () => {
    it('returns the option class_name if given', () => {
      class Post {}
      const reflection = new AbstractReflection('author', { class_name: 'User' }, Post)

      expect(reflection.class_name).to.eq('User')
    })

    it('returns a best guess if not in options', () => {
      class Post {}
      const reflection = new AbstractReflection('author', {}, Post)

      expect(reflection.class_name).to.eq('Author')
    })
  })

  describe('#target', () => {
    it('returns the associated class if it exists', () => {
      class User extends ActiveRecord.Base {}
      const _User = ActiveRecord(User).default
      class Post extends ActiveRecord.Base {}
      belongs_to('user')
      ActiveRecord(Post)

      const reflection = new AbstractReflection('user', {}, Post)
      expect(reflection.target).to.eq(_User)
    })
  })

  describe('build_association', () => {
    it('returns the associated class if it exists', () => {
      class User extends ActiveRecord.Base {}
      const _User = ActiveRecord(User).default
      class Post extends ActiveRecord.Base {}
      belongs_to('user')
      ActiveRecord(Post)

      const reflection = new AbstractReflection('user', {}, Post)
      expect(reflection.build_association({})).to.be.instanceof(_User)
    })
  })

  describe('derive_foreign_key', () => {
    it('returns the option foreign key', () => {
      class Post extends ActiveRecord.Base {}
      const reflection = new AbstractReflection('user', { foreign_key: 'userId' }, Post)
      expect(reflection.foreign_key).to.eq('userId')
    })

    it('derives the foreign key if not given', () => {
      class Post extends ActiveRecord.Base {}
      const reflection = new AbstractReflection('user', {}, Post)
      expect(reflection.foreign_key).to.eq('post_id')
    })

    it('uses the target association in a belongs to relation', () => {
      class Post extends ActiveRecord.Base {}
      const reflection = new AbstractReflection('user', {}, Post)

      reflection.belongs_to = true
      expect(reflection.foreign_key).to.eq('user_id')
    })
  })
})
