import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select Max ', () => {
  describe('simple max', () => {
    const users = new Sequel.Relation('users')
    const max = users.project(users.column('age').max())
    const maximum = users.project(users.column('age').maximum())

    feature({
      ast: [max, maximum],
      postgresql: 'SELECT MAX("users"."age") FROM "users"'
    })
  })

  describe('aliased max', () => {
    const users = new Sequel.Relation('users')
    const max = users.project(users.column('age').max().as('oldest'))
    const maximum = users.project(users.column('age').maximum().as('oldest'))

    feature({
      ast: [max, maximum],
      postgresql: 'SELECT MAX("users"."age") AS oldest FROM "users"'
    })
  })
})
