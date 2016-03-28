import * as Sequel from '../../../lib/sequel'
import { feature } from '../support'

describe('INNER JOIN: ', () => {
  describe('simple join', () => {
    const users = new Sequel.Relation('users')
    const drugs = new Sequel.Relation('drugs')
    const ast = users.project(Sequel.star)
                     .from(users)
                     .join(drugs)
                     .on(users.column('drug_id').equal(drugs.column('id')))

    feature({
      ast,
      postgresql: 'SELECT * FROM "users" INNER JOIN "drugs" ON "users"."drug_id" = "drugs"."id"'
    })
  })

  describe('multi column select with join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const ast = users.project(users.column('name'), posts.column('content'))
                     .from(users)
                     .join(posts)
                     .on(users.column('id').equal(posts.column('user_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content" FROM "users" INNER JOIN "posts" ON "users"."id" = "posts"."user_id"'
    })
  })

  describe('three table join', () => {
    const users = new Sequel.Relation('users')
    const posts = new Sequel.Relation('posts')
    const comments = new Sequel.Relation('comments')
    const ast = users.project(users.column('name'), posts.column('content'), comments.column('text'))
                     .from(users)
                     .join(posts)
                     .on(users.column('id').equal(posts.column('user_id')))
                     .join(comments)
                     .on(posts.column('id').equal(comments.column('post_id')))

    feature({
      ast,
      postgresql: 'SELECT "users"."name", "posts"."content", "comments"."text" FROM "users" INNER JOIN "posts" ON "users"."id" = "posts"."user_id" INNER JOIN "comments" ON "posts"."id" = "comments"."post_id"'
    })
  })
})
