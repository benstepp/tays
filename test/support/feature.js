import { PostgresqlVisitor } from 'lib/sequel/visitors'

function feature(test) {
  if (Array.isArray(test.ast)) {
    test.ast.forEach(ast => {
      scenario(ast, test.postgresql, new PostgresqlVisitor())
    })
  } else {
    scenario(test.ast, test.postgresql, new PostgresqlVisitor())
  }
}

function scenario(ast, expectation, visitor) {
  return it(`produces the expected sql for ${visitor.constructor.name}`, () => {
    const result = ast.to_sql(visitor)
    expect(result).to.equal(expectation)
  })
}

export { feature }
