import * as Tays from 'lib'

const decorators = [
  'has_many',
  'has_one',
  'belongs_to',
  'has_and_belongs_to_many'
]

describe('Decorator Exports at top level', () => {
  decorators.forEach(decorator => {
    describe(`${decorator} Decorator`, () => {
      it('exists and is a function', () => {
        expect(Tays[decorator]).to.exist
        expect(Tays[decorator]).to.be.a('function')
      })

      it('returns a function', () => {
        expect(Tays[decorator]()).to.be.a('function')
      })
    })
  })
})
