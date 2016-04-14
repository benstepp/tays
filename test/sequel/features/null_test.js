import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('IS NULL:', () => {
  describe('is', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).where(users.attribute('email').equal(null))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."email" IS NULL'
    })
  })

  describe('is not', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).where(users.attribute('email').not_equal(null))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."email" IS NOT NULL'
    })
  })
})
