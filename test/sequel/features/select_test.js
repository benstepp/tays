import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Simple Select Statements', () => {
  describe('select * from table', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(Sequel.star)
    const select = users.select(Sequel.star)

    feature({
      ast: [project, select],
      postgresql: 'SELECT * FROM "users"'
    })
  })

  describe('select a single attribute', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.attribute('id'))
    const select = users.select(users.attribute('id'))

    feature({
      ast: [project, select],
      postgresql: 'SELECT "users"."id" FROM "users"'
    })
  })

  describe('select single attribute with alias', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.attribute('id').as('user_id'))
    const select = users.select(users.attribute('id').as('user_id'))

    feature({
      ast: [project, select],
      postgresql: 'SELECT "users"."id" AS user_id FROM "users"'
    })
  })

  describe('select multiple attributes', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.attribute('id'))
                     .project(users.attribute('username'))
                     .project(users.attribute('email'))

    const select = users.select(users.attribute('id'))
                     .select(users.attribute('username'))
                     .select(users.attribute('email'))
    feature({
      ast: [project, select],
      postgresql: 'SELECT "users"."id", "users"."username", "users"."email" FROM "users"'
    })
  })

  describe('subselect statement', () => {
    const users = new Sequel.Relation('users')
    const things = new Sequel.Relation('things')
    const project = things.project(users.project(Sequel.star))
    const select = things.select(users.select(Sequel.star))

    feature({
      ast: [project, select],
      postgresql: 'SELECT (SELECT * FROM "users") FROM "things"'
    })
  })
})
