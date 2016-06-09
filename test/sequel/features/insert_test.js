import * as Sequel from 'lib/sequel'
import { feature } from 'test/support'

describe('Simple Insert', () => {
  describe('single column', () => {
    const posts = new Sequel.Relation('posts')
    const content = posts.attribute('content')
    const ast = posts.insert(content.value('Life is Good.'))
    feature({
      ast,
      postgresql: 'INSERT INTO "posts" ("posts"."content") VALUES (\'Life is Good.\')'
    })
  })
})
