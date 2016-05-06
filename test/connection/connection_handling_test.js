import { include } from '../../lib/meta'
import { ConnectionHandling } from '../../lib/connection'

describe('ConnectionHandling', () => {
  it('exists', () => {
    expect(ConnectionHandling).to.exist
    expect(() => ConnectionHandling()).to.throw(TypeError)
  })
})
