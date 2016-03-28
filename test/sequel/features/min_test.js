import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select Min ', () => {
  describe('simple min', () => {
    const users = new Sequel.Relation('users')
    const min = users.project(users.column('age').min())
    const minimum = users.project(users.column('age').minimum())

    feature({
      ast: [min, minimum],
      postgresql: 'SELECT MIN("users"."age") FROM "users"'
    })
  })

  describe('aliased min', () => {
    const users = new Sequel.Relation('users')
    const min = users.project(users.column('age').min().as('youngest'))
    const minimum = users.project(users.column('age').minimum().as('youngest'))

    feature({
      ast: [min, minimum],
      postgresql: 'SELECT MIN("users"."age") AS youngest FROM "users"'
    })
  })
})
