import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('SELECT DISTINCT', () => {
  describe('simple distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('id')).distinct()

    feature({
      ast,
      postgresql: 'SELECT DISTINCT "users"."id" FROM "users"'
    })
  })

  describe('count distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('id').count(true))

    feature({
      ast,
      postgresql: 'SELECT COUNT(DISTINCT "users"."id") FROM "users"'
    })
  })

  describe('aliased distinct count', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('id').count(true).as('counterino'))

    feature({
      ast,
      postgresql: 'SELECT COUNT(DISTINCT "users"."id") AS counterino FROM "users"'
    })
  })

  describe('multi column select distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.column('id'), users.column('age')).distinct()

    feature({
      ast,
      postgresql: 'SELECT DISTINCT "users"."id", "users"."age" FROM "users"'
    })
  })
})
