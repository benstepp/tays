import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Select Where Statements', () => {
  describe('select where single', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('id').equal('1'))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."id" = \'1\''
    })
  })

  describe('select greater than', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('age').gt(21))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."age" > 21'
    })
  })

  describe('select where multiple expressions', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('id').equal(1))
                     .where(users.attribute('email').equal('me@benstepp.com'))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."id" = 1 AND "users"."email" = \'me@benstepp.com\''
    })
  })

  describe('select multiple predications', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('age').gteq(18))
                     .where(users.attribute('best').equal(true))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."age" >= 18 AND "users"."best" = TRUE'
    })
  })

  describe('please dont use values directly', () => {
    /* eslint-disable quotes */
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('description').equal('Don\'t use y\'all'))
    feature({
      ast,
      postgresql: `SELECT * FROM "users" WHERE "users"."description" = 'Don''t use y''all'`
    })
    /* eslint-enable quotes */
  })

  describe('single bind param', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('age').equal(Sequel.bind))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."age" = $1'
    })
  })

  describe('multiple bind params', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star)
                     .where(users.attribute('age').equal(Sequel.bind))
                     .where(users.attribute('sex').equal(Sequel.bind))
                     .where(users.attribute('location').equal(Sequel.bind))
    feature({
      ast,
      postgresql: 'SELECT * FROM "users" WHERE "users"."age" = $1 AND "users"."sex" = $2 AND "users"."location" = $3'
    })
  })
})
