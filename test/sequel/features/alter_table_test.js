import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('ALTER TABLE', () => {
  describe('simple table', () => {
    const users = new Sequel.Relation('users')
    const ast = users.alter()

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users"'
    })
  })

  describe('with a attribute', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar()
    const ast = users.alter().add(email)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ADD COLUMN "email" character varying'
    })
  })

  describe('with multiple attributes', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar(100)
    const created_at = users.column('created_at').datetime()
    const ast = users.alter().add(email, created_at)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ADD COLUMN "email" character varying(100), ADD COLUMN "created_at" timestamps'
    })
  })

  describe('adding and dropping', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').varchar()
    const dumpster = users.column('dumpster')
    const ast = users.alter().add(email).drop(dumpster)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ADD COLUMN "email" character varying, DROP COLUMN "dumpster"'
    })
  })

  describe('drop column and alter column default', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').default('iamthebest@fightingdragonswithtaylorswift.com')
    const dumpster = users.column('dumpster')
    const ast = users.alter().alter(email).drop(dumpster)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT \'iamthebest@fightingdragonswithtaylorswift.com\', DROP COLUMN "dumpster"'
    })
  })

  describe('drop column default', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').default()
    const dumpster = users.column('dumpster')
    const ast = users.alter().alter(email).drop(dumpster)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT, DROP COLUMN "dumpster"'
    })
  })

  describe('add column no nulls', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').null(false)
    const ast = users.alter().add(email)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ADD COLUMN "email" NOT NULL'
    })
  })

  describe('alter column drop not null', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('email').null(false)
    const ast = users.alter().alter(email)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL'
    })
  })

  describe('rename table', () => {
    const users = new Sequel.Relation('things')
    const ast = users.alter().rename('stuffs')

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "things" RENAME TO "stuffs"'
    })
  })

  describe('rename a column', () => {
    const users = new Sequel.Relation('users')
    const email = users.column('stuffs').rename('things')
    const ast = users.alter().alter(email)

    feature({
      ast: [ast],
      postgresql: 'ALTER TABLE "users" RENAME COLUMN "stuffs" TO "things"'
    })
  })
})
