import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Select LIMIT ', () => {
  describe('simple limit', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).limit(1)

    feature({
      ast: [ast],
      postgresql: 'SELECT * FROM "users" LIMIT 1'
    })
  })

  describe('limit with another number', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('blunts')).limit(420)

    feature({
      ast: [ast],
      postgresql: 'SELECT "users"."blunts" FROM "users" LIMIT 420'
    })
  })

  describe('limit with order by', () => {
    const users = new Sequel.Relation('users')
    const asc = users.project(users.attribute('blunts')).order(users.attribute('email').asc()).limit(10)
    const ascending = users.project(users.attribute('blunts')).order(users.attribute('email').ascending()).limit(10)

    feature({
      ast: [asc, ascending],
      postgresql: 'SELECT "users"."blunts" FROM "users" ORDER BY "users"."email" ASC LIMIT 10'
    })
  })

  describe('limit with offset', () => {
    const users = new Sequel.Relation('users')
    const limit_offset = users.project(Sequel.star).limit(4).offset(10)
    const offset_limit = users.project(Sequel.star).limit(4).offset(10)

    feature({
      ast: [limit_offset, offset_limit],
      postgresql: 'SELECT * FROM "users" LIMIT 4 OFFSET 10'
    })
  })

  describe('limit with bindparam', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).limit(Sequel.bind)

    feature({
      ast: [ast],
      postgresql: 'SELECT * FROM "users" LIMIT $1'
    })
  })

  describe('limit with offset bindparam', () => {
    const users = new Sequel.Relation('users')
    const limit_offset = users.project(Sequel.star).limit(Sequel.bind).offset(Sequel.bind)
    const offset_limit = users.project(Sequel.star).limit(Sequel.bind).offset(Sequel.bind)

    feature({
      ast: [limit_offset, offset_limit],
      postgresql: 'SELECT * FROM "users" LIMIT $1 OFFSET $2'
    })
  })
})
