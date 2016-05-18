import { include } from 'lib/meta'
import { isEqual as match_array } from 'lodash'

describe('include', () => {
  it('is a function', () => {
    expect(include).to.exist
    expect(include).to.be.a('function')
  })

  it('returns a function', () => {
    expect(include()).to.be.a('function')
  })

  it('includes nothing if no option passed', () => {
    @include()
    class A {}
    class B {}

    const a_methods = Object.getOwnPropertyNames(A)
    const b_methods = Object.getOwnPropertyNames(B)
    expect(match_array(a_methods, b_methods)).to.eq(true)
  })

  it('it adds the instance methods of a class', () => {
    class A { a() { return 'a' } }

    @include(A)
    class B {}

    const instance = new B()
    expect(instance.a).to.be.a('function')
    expect(instance.a()).to.eq('a')
  })

  it('it adds the static methods of a class', () => {
    class A { static a() { return 'a' } }

    @include(A)
    class B {}

    expect(B.a).to.be.a('function')
    expect(B.a()).to.eq('a')
  })

  it('does not change the name of the class', () => {
    class A { a() { return 'a' } }

    @include(A)
    class B {}

    expect(B.name).to.eq('B')
  })

  it('can add multiple classes at once', () => {
    class A { static a() { return 'a' } }
    class B { static b() { return 'b' } }

    @include(A, B)
    class C {}

    expect(C.a).to.be.a('function')
    expect(C.a()).to.eq('a')
    expect(C.b).to.be.a('function')
    expect(C.b()).to.eq('b')
  })

  it('can add symbol propertyies', () => {
    const a = Symbol()
    class A { static [a]() { return 'a' } }
    @include(A)
    class B {}

    expect(() => B[a]()).to.not.throw(Error)
    expect(B[a]).to.be.a('function')
    expect(B[a]()).to.eq('a')
  })
})
