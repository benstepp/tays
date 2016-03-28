import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select Count', () => {
  describe('simple row count', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star.count())

    feature({
      ast,
      postgresql: 'SELECT COUNT(*) FROM "users"'
    })
  })

  describe('simple column count', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('age').count())

    feature({
      ast,
      postgresql: 'SELECT COUNT("users"."age") FROM "users"'
    })
  })

  describe('aliased count', () => {
    const posts = new Sequel.Relation('posts')
    const ast = posts.project(posts.column('author').count().as('author_count'))

    feature({
      ast,
      postgresql: 'SELECT COUNT("posts"."author") AS author_count FROM "posts"'
    })
  })

  describe('distinct count', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('age').count(true))

    feature({
      ast,
      postgresql: 'SELECT COUNT(DISTINCT "users"."age") FROM "users"'
    })
  })
})
