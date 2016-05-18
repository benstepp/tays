import { Registry } from 'lib/registry'

describe('Registry', () => {
  it('exists', () => {
    expect(Registry).to.exist
  })

  describe('models', () => {
    it('always returns an object', () => {
      expect(Registry.models).to.exist
      expect(Registry.models).to.be.a('object')
    })
  })

  describe('register', () => {
    it('adds the models', () => {
      class Post { static get namespace() { return '' } }
      class User { static get namespace() { return '' } }
      class Role { static get namespace() { return '' } }

      Registry.register(Post)
      Registry.register(User)
      Registry.register(Role)

      expect(Registry.get_model('Post')).to.eq(Post)
      expect(Registry.get_model('User')).to.eq(User)
      expect(Registry.get_model('Role')).to.eq(Role)
    })

    it('works with namespaces', () => {
      class Post { static get namespace() { return 'Spaghetti' } }
      class User { static get namespace() { return 'Spaghetti' } }
      class Role { static get namespace() { return 'Spaghetti' } }

      Registry.register(Post)
      Registry.register(User)
      Registry.register(Role)

      expect(Registry.get_model('Spaghetti.Post')).to.eq(Post)
      expect(Registry.get_model('Spaghetti.User')).to.eq(User)
      expect(Registry.get_model('Spaghetti.Role')).to.eq(Role)
    })

    it('returns the non-namespaced model if one cannot be found', () => {
      class Post { static get namespace() { return 'Asdf' } }
      class User { static get namespace() { return '' } }

      Registry.register(Post)
      Registry.register(User)

      expect(Registry.get_model('User')).to.eq(User)
      expect(Registry.get_model('Asdf.User')).to.eq(User)
    })
  })
})
