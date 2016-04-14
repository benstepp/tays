import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('Select AVG ', () => {
  describe('simple avg', () => {
    const users = new Sequel.Relation('users')
    const avg = users.project(users.attribute('age').avg())
    const average = users.project(users.attribute('age').average())

    feature({
      ast: [avg, average],
      postgresql: 'SELECT AVG("users"."age") FROM "users"'
    })
  })

  describe('aliased avg', () => {
    const users = new Sequel.Relation('users')
    const avg = users.project(users.attribute('age').avg().as('mean_age'))
    const average = users.project(users.attribute('age').average().as('mean_age'))

    feature({
      ast: [avg, average],
      postgresql: 'SELECT AVG("users"."age") AS mean_age FROM "users"'
    })
  })
})
