import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('IN: ', () => {
  describe('without an expression', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).where(users.column('gender').in())

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE 1=0'
    })
  })

  describe('in single item array', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).where(users.column('gender').in('male'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."gender" IN (\'male\')'
    })
  })

  describe('multi item array', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.column('gender')
                     .in('male', 'female', 'transgender', 'apache helicopter'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."gender" IN (\'male\', \'female\', \'transgender\', \'apache helicopter\')'
    })
  })

  describe('in bindparam', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).where(users.column('gender').in(Sequel.bind))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."gender" IN ($1)'
    })
  })
})
