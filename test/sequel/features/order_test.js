import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select Order', () => {
  describe('without direction', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).order(users.column('age'))

    feature({
      ast: [ast],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age"'
    })
  })

  describe('with ascending', () => {
    const users = new Sequel.Relation('users')
    const asc = users.project(Sequel.star).order(users.column('age').asc())
    const ascending = users.project(Sequel.star).order(users.column('age').ascending())

    feature({
      ast: [asc, ascending],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age" ASC'
    })
  })

  describe('with descending', () => {
    const users = new Sequel.Relation('users')
    const desc = users.project(Sequel.star).order(users.column('age').desc())
    const descending = users.project(Sequel.star).order(users.column('age').descending())

    feature({
      ast: [desc, descending],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age" DESC'
    })
  })

  describe('with multiple orders', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).order(users.column('age'), users.column('cars'))

    feature({
      ast: [ast],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age", "users"."cars"'
    })
  })

  describe('with multiple orders and a direction', () => {
    const users = new Sequel.Relation('users')
    const asc = users.project(Sequel.star).order(users.column('age'), users.column('cars').asc())
    const ascending = users.project(Sequel.star).order(users.column('age'), users.column('cars').ascending())

    feature({
      ast: [asc, ascending],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age", "users"."cars" ASC'
    })
  })

  describe('multiple columns and multiple directions', () => {
    const users = new Sequel.Relation('users')
    const asc = users.project(Sequel.star).order(users.column('age').desc(), users.column('cars').asc())
    const ascending = users.project(Sequel.star).order(users.column('age').descending(), users.column('cars').ascending())

    feature({
      ast: [asc, ascending],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age" DESC, "users"."cars" ASC'
    })
  })

  describe('with column is null', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).order(users.column('age').equal(null))

    feature({
      ast: [ast],
      postgresql: 'SELECT * FROM "users" ORDER BY "users"."age" IS NULL'
    })
  })
})
