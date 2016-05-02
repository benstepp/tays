import { isEqual as match_array } from 'lodash'
import { AttributeSet } from '../../lib/attributes'

describe('AttributeSet', () => {
  it('exists', () => {
    expect(AttributeSet).to.exist
    expect(() => AttributeSet()).to.throw(TypeError)
  })

  describe('getting and setting attributes', () => {
    it('returns an attribute', () => {
      const attributes = new AttributeSet()
      attributes.set('answer', 42)

      expect(attributes.get('answer')).to.eq(42)
    })

    it('will typecast if available', () => {
      const casters = new Map()
      casters.set('answer', { cast(val) { return String(val) } })

      const attributes = new AttributeSet(casters)
      attributes.set('answer', 42)

      expect(attributes.get('answer')).to.eq('42')
    })
  })

  describe('keys', () => {
    it('returns unique keys', () => {
      const attributes = new AttributeSet()
      attributes.set('answer', 42)
      attributes.set('things', 42)
      attributes.set('things', 'asdf')
      attributes.set('stuffs', 42)

      expect(match_array(attributes.keys, ['answer', 'things', 'stuffs'])).to.eq(true)
    })
  })
})
