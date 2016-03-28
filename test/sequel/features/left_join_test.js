import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('LEFT JOIN:', () => {
  describe('simple join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const ast = users.project(users.column('name'), posts.column('content'))
                     .from(users)
                     .left_join(posts)
                     .on(users.column('id').equal(posts.column('user_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content" FROM "users" LEFT JOIN "posts" ON "users"."id" = "posts"."user_id"'
    })
  })

  describe('double join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const comments = new Sequel.Relation('comments')
    const ast = users.project(users.column('name'), posts.column('content'), comments.column('text'))
                     .from(users)
                     .left_join(posts)
                     .on(users.column('id').equal(posts.column('user_id')))
                     .left_join(comments)
                     .on(posts.column('id').equal(comments.column('post_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content", "comments"."text" FROM "users" LEFT JOIN "posts" ON "users"."id" = "posts"."user_id" LEFT JOIN "comments" ON "posts"."id" = "comments"."post_id"'
    })
  })
})
