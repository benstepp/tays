import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

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

  describe('select a single column', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.column('id'))
    const select = users.select(users.column('id'))

    feature({
      ast: [project, select],
      postgresql: 'SELECT "users"."id" FROM "users"'
    })
  })

  describe('select single column with alias', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.column('id').as('user_id'))
    const select = users.select(users.column('id').as('user_id'))

    feature({
      ast: [project, select],
      postgresql: 'SELECT "users"."id" AS user_id FROM "users"'
    })
  })

  describe('select multiple columns', () => {
    const users = new Sequel.Relation('users')
    const project = users.project(users.column('id'))
                     .project(users.column('username'))
                     .project(users.column('email'))

    const select = users.select(users.column('id'))
                     .select(users.column('username'))
                     .select(users.column('email'))
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
