import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('GROUP BY:', () => {
  describe('single attribute group', () => {
    const posts = new Sequel.Relation('posts')
    const ast = posts.project(Sequel.star).group(posts.attribute('user_id'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "posts" GROUP BY "posts"."user_id"'
    })
  })

  describe('multi attribute group', () => {
    const posts = new Sequel.Relation('posts')
    const ast = posts.project(Sequel.star).group(posts.attribute('user_id'), posts.attribute('created_at'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "posts" GROUP BY "posts"."user_id", "posts"."created_at"'
    })
  })
})
