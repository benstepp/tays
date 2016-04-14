import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('SELECT DISTINCT', () => {
  describe('simple distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('id')).distinct()

    feature({
      ast,
      postgresql: 'SELECT DISTINCT "users"."id" FROM "users"'
    })
  })

  describe('count distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('id').count(true))

    feature({
      ast,
      postgresql: 'SELECT COUNT(DISTINCT "users"."id") FROM "users"'
    })
  })

  describe('aliased distinct count', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('id').count(true).as('counterino'))

    feature({
      ast,
      postgresql: 'SELECT COUNT(DISTINCT "users"."id") AS counterino FROM "users"'
    })
  })

  describe('multi attribute select distinct', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(users.attribute('id'), users.attribute('age')).distinct()

    feature({
      ast,
      postgresql: 'SELECT DISTINCT "users"."id", "users"."age" FROM "users"'
    })
  })
})
