import { Registrar } from '../lib/registrar'

describe('Registrar', () => {
  it('exists', () => {
    expect(Registrar).to.exist
  })

  describe('models', () => {
    it('always returns an object', () => {
      expect(Registrar.models).to.exist
      expect(Registrar.models).to.be.a('object')

      Registrar.models = null
      expect(Registrar.models).to.be.a('object')

      Registrar.models = 42
      expect(Registrar.models).to.be.a('object')
    })
  })

  describe('register', () => {
    it('adds the models', () => {
      class Post { static get namespace() { return '' } }
      class User { static get namespace() { return '' } }
      class Role { static get namespace() { return '' } }

      Registrar.register(Post)
      Registrar.register(User)
      Registrar.register(Role)

      expect(Registrar.get_model('Post')).to.eq(Post)
      expect(Registrar.get_model('User')).to.eq(User)
      expect(Registrar.get_model('Role')).to.eq(Role)
    })

    it('works with namespaces', () => {
      class Post { static get namespace() { return 'Spaghetti' } }
      class User { static get namespace() { return 'Spaghetti' } }
      class Role { static get namespace() { return 'Spaghetti' } }

      Registrar.register(Post)
      Registrar.register(User)
      Registrar.register(Role)

      expect(Registrar.get_model('Spaghetti.Post')).to.eq(Post)
      expect(Registrar.get_model('Spaghetti.User')).to.eq(User)
      expect(Registrar.get_model('Spaghetti.Role')).to.eq(Role)
    })

    it('returns the non-namespaced model if one cannot be found', () => {
      class Post { static get namespace() { return 'Asdf' } }
      class User { static get namespace() { return '' } }

      Registrar.register(Post)
      Registrar.register(User)

      expect(Registrar.get_model('User')).to.eq(User)
      expect(Registrar.get_model('Asdf.User')).to.eq(User)
    })
  })
})
