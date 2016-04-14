import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('LEFT JOIN:', () => {
  describe('simple join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const ast = users.project(users.attribute('name'), posts.attribute('content'))
                     .from(users)
                     .left_join(posts)
                     .on(users.attribute('id').equal(posts.attribute('user_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content" FROM "users" LEFT JOIN "posts" ON "users"."id" = "posts"."user_id"'
    })
  })

  describe('double join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const comments = new Sequel.Relation('comments')
    const ast = users.project(users.attribute('name'), posts.attribute('content'), comments.attribute('text'))
                     .from(users)
                     .left_join(posts)
                     .on(users.attribute('id').equal(posts.attribute('user_id')))
                     .left_join(comments)
                     .on(posts.attribute('id').equal(comments.attribute('post_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content", "comments"."text" FROM "users" LEFT JOIN "posts" ON "users"."id" = "posts"."user_id" LEFT JOIN "comments" ON "posts"."id" = "comments"."post_id"'
    })
  })
})
