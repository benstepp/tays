import { include } from '../../lib/meta'
import { ConnectionHandling } from '../../lib/connection'

describe('ConnectionHandling', () => {
  it('exists', () => {
    expect(ConnectionHandling).to.exist
    expect(() => ConnectionHandling()).to.throw(TypeError)
  })

  it('it shares the connection across all classes', () => {
    @include(ConnectionHandling)
    class A {}

    @include(ConnectionHandling)
    class B {}

    expect(A.connection).to.eq(B.connection)
  })

  it('can be overridden in a specific class', () => {
    @include(ConnectionHandling)
    class A {}

    class B { static get connection() { return null } }

    expect(A.connection).to.not.eq(B.connection)
  })
})
