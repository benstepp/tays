import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('DROP TABLE', () => {
  describe('simple table', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE "users"'
    })
  })

  describe('IF EXISTS', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().if_exists()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE IF EXISTS "users"'
    })
  })

  describe('RESTRICT', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().restrict()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE "users" RESTRICT'
    })
  })

  describe('CASCADE', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().cascade()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE "users" CASCADE'
    })
  })

  describe('CASCADE vs RESTRICT', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().cascade().restrict().cascade()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE "users" CASCADE'
    })
  })

  describe('IF EXISTS CASCADE', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().if_exists().cascade()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE IF EXISTS "users" CASCADE'
    })
  })

  describe('IF EXISTS RESTRICT', () => {
    const users = new Sequel.Relation('users')
    const ast = users.drop().if_exists().restrict()

    feature({
      ast: [ast],
      postgresql: 'DROP TABLE IF EXISTS "users" RESTRICT'
    })
  })
})
