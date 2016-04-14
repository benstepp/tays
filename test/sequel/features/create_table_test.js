
import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('CREATE TABLE', () => {
  describe('simple table', () => {
    const users = new Sequel.Managers.CreateTableManager('users')

    feature({
      ast: [users],
      postgresql: 'CREATE TABLE "users"'
    })
  })
})
