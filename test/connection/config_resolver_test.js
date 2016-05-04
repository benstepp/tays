import { ConfigResolver } from '../../lib/connection'

describe('ConfigResolver', () => {
  it('exists', () => {
    expect(ConfigResolver).to.exist
    expect(() => ConfigResolver()).to.throw(TypeError)
  })

  describe('given a url', () => {
    it('can return the url', () => {
      const url = 'postgres://username:password@host:port/database'
      const config = new ConfigResolver(url)
      expect(config.url).to.eq(url)
    })

    it('can return an object', () => {
      const url = 'postgres://username:password@host:port/database'
      const config = new ConfigResolver(url)
      const config_object = config.to_object()
      const { adapter, username, password, hostname, port, database } = config_object

      expect(adapter).to.eq('postgres')
      expect(username).to.eq('username')
      expect(password).to.eq('password')
      expect(hostname).to.eq('host')
      expect(port).to.eq('port')
      expect(database).to.eq('database')
    })
  })
})
