import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('GROUP BY:', () => {
  describe('single column group', () => {
    const posts = new Sequel.Relation('posts')
    const ast = posts.project(Sequel.star).group(posts.column('user_id'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "posts" GROUP BY "posts"."user_id"'
    })
  })

  describe('multi column group', () => {
    const posts = new Sequel.Relation('posts')
    const ast = posts.project(Sequel.star).group(posts.column('user_id'), posts.column('created_at'))

    feature({
      ast,
      postgresql: 'SELECT * FROM "posts" GROUP BY "posts"."user_id", "posts"."created_at"'
    })
  })
})
