
import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('CREATE TABLE', () => {
  describe('simple table', () => {
    const users = new Sequel.Relation('users')
    const ast = users.create()

    feature({
      ast: [ast],
      postgresql: 'CREATE TABLE "users"'
    })
  })

  describe('with a attribute', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar(100)
    const ast = users.create().add(email)

    feature({
      ast: [ast],
      postgresql: 'CREATE TABLE "users" ("email" varchar(100))'
    })
  })
})
