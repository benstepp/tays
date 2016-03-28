import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('SELECT FOR SHARE', () => {
  describe('simple FOR SHARE', () => {
    const users = new Sequel.Relation('users')
    const ast = users.project(Sequel.star).for_share()

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" FOR SHARE'
    })
  })
})
