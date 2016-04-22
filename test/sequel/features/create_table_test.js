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
    const ast = users.create().columns(email)

    feature({
      ast: [ast],
      postgresql: 'CREATE TABLE "users" ("email" varchar(100))'
    })
  })

  describe('with multiple attributes', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar(100)
    const created_at = users.column('created_at').datetime()
    const ast = users.create().columns(email, created_at)

    feature({
      ast: [ast],
      postgresql: 'CREATE TABLE "users" ("email" varchar(100), "created_at" timestamps)'
    })
  })

  describe('with a primary key', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar(100)
    const id = users.column('id').primary_key()
    const ast = users.create().columns(email, id)

    feature({
      ast: [ast],
      postgresql: 'CREATE TABLE "users" ("email" varchar(100), "id" serial primary key)'
    })
  })
})
