import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select SUM ', () => {
  describe('simple sum', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('age').sum())

    feature({
      ast,
      postgresql: 'SELECT SUM("users"."age") FROM "users"'
    })
  })

  describe('aliased min', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('age').sum().as('age_sum'))

    feature({
      ast,
      postgresql: 'SELECT SUM("users"."age") AS age_sum FROM "users"'
    })
  })
})
