import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Select SUM ', () => {
  describe('simple sum', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('age').sum())

    feature({
      ast,
      postgresql: 'SELECT SUM("users"."age") FROM "users"'
    })
  })

  describe('aliased min', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('age').sum().as('age_sum'))

    feature({
      ast,
      postgresql: 'SELECT SUM("users"."age") AS age_sum FROM "users"'
    })
  })
})
