import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('SELECT FOR UPDATE', () => {
  describe('simple FOR UPDATE', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).for_update()

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" FOR UPDATE'
    })
  })
})
