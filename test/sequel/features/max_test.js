import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Select Max ', () => {
  describe('simple max', () => {
    const users = new Sequel.Relation('users')
    const max = users.project(users.attribute('age').max())
    const maximum = users.project(users.attribute('age').maximum())

    feature({
      ast: [max, maximum],
      postgresql: 'SELECT MAX("users"."age") FROM "users"'
    })
  })

  describe('aliased max', () => {
    const users = new Sequel.Relation('users')
    const max = users.project(users.attribute('age').max().as('oldest'))
    const maximum = users.project(users.attribute('age').maximum().as('oldest'))

    feature({
      ast: [max, maximum],
      postgresql: 'SELECT MAX("users"."age") AS oldest FROM "users"'
    })
  })
})
