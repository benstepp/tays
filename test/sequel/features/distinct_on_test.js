import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Select DISTINCT ON', () => {
  describe('with multiple attributes', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('age'), users.attribute('power_level')).distinct_on(users.attribute('name'))

    feature({
      ast: [ast],
      postgresql: 'SELECT DISTINCT ON ("users"."name") "users"."age", "users"."power_level" FROM "users"'
    })
  })

  describe('with star', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).distinct_on(users.attribute('name'))

    feature({
      ast: [ast],
      postgresql: 'SELECT DISTINCT ON ("users"."name") * FROM "users"'
    })
  })

  describe('with a where clause', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).distinct_on(users.attribute('name')).where(users.attribute('age').gteq(21))

    feature({
      ast: [ast],
      postgresql: 'SELECT DISTINCT ON ("users"."name") * FROM "users" WHERE "users"."age" >= 21'
    })
  })
})
