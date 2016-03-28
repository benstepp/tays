import { AssociationTransformer } from '../../../lib/factory/transformers'

describe('AssociationTranfomrmer', () => {
  it('exists as a class', () => {
    expect(AssociationTransformer).to.exist
    expect(AssociationTransformer).to.be.a('function')
    expect(() => AssociationTransformer()).to.throw(TypeError)
  })

  describe('transformer iterface', () => {
    it('implements an #transform method', () => {
      const transformer = new AssociationTransformer()
      expect(transformer.transform).to.be.a('function')
    })
  })
})
