import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('INNER JOIN: ', () => {
  describe('simple join', () => {
    const users = new Sequel.Relation('users')
    const drugs = new Sequel.Relation('drugs')
    const ast = users.project(Sequel.star)
                     .from(users)
                     .join(drugs)
                     .on(users.attribute('drug_id').equal(drugs.attribute('id')))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" INNER JOIN "drugs" ON "users"."drug_id" = "drugs"."id"'
    })
  })

  describe('multi attribute select with join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const ast = users.project(users.attribute('name'), posts.attribute('content'))
                     .from(users)
                     .join(posts)
                     .on(users.attribute('id').equal(posts.attribute('user_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content" FROM "users" INNER JOIN "posts" ON "users"."id" = "posts"."user_id"'
    })
  })

  describe('three table join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const comments = new Sequel.Relation('comments')
    const ast = users.project(users.attribute('name'), posts.attribute('content'), comments.attribute('text'))
                     .from(users)
                     .join(posts)
                     .on(users.attribute('id').equal(posts.attribute('user_id')))
                     .join(comments)
                     .on(posts.attribute('id').equal(comments.attribute('post_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content", "comments"."text" FROM "users" INNER JOIN "posts" ON "users"."id" = "posts"."user_id" INNER JOIN "comments" ON "posts"."id" = "comments"."post_id"'
    })
  })
})
