import * as Sequel from '../../../lib/sequel'

const PlainString = Sequel.Collectors.PlainString

describe('PlainString', () => {
  it('exists as a class', () => {
    expect(PlainString).to.exist
    expect(PlainString).to.be.a('function')
    expect(() => PlainString()).to.throw(Error)
  })

  describe('#add_bind', () => {
    it('is not supported', () => {
      const string = new PlainString()
      expect(() => string.add_bind()).to.throw(Sequel.NotSupportedError)
    })
  })

  describe('#push', () => {
    it('adds to the internal string value', () => {
      const string = new PlainString()
      string.push('asdfasdf')
      expect(string.string).to.include('asdfasdf')
    })
  })

  describe('#value', () => {
    it('returns a string', () => {
      const string = new PlainString()
      expect(string.value).to.be.a('string')

      string.push('asdfasdf')
      expect(string.value).to.be.a('string')
    })
  })
})
