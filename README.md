#no this doesnt work yet

General Idea:
decorators just build an ast and return noop function decorators
when activerecord is called (last in file) the association and
callback asts are parsed into an underlying framework class and the
user defined class is copied on top of it. This will maintain the
super functionality without a Proxy method being called on every
single method call. Take advantage of the prototype system in js rather
than shoving everything into method_missing / proxy.get

Stuff in /lib/meta works. Thinking about including under a class with
a copy on top of it so that super would work for included stuff. Public
interface would remain the same.

Arel mostly copy pastad from ruby. Interface for ActiveRecord is too stronk
for most projects not to copy pasta. Implementation will have to change
because javascript differently strong from ruby. All licenses can be
found in LICENCE.md.

Some desired syntax abusing decorators as not decorators and as just
carefully placed functions to look beautiful.

```javascript
// models/user.js
import { CustomValidator } from './validators'
import { NullRole } from './null_role'
import {
  ActiveRecord,
  before_save,
  belongs_to,
  has_many,
  scope,
  validates_presence_of
  validates_with,
} from 'tays'

class User extends ActiveRecord.Base {
  @belongs_to('role')
  @has_many('posts', { class_name: 'ShitPost' })

  @validates_presence_of('email')
  @validates_with(CustomValidator)

  @scope('admin', () => this.joins('role').where({ admin: true }))

  custom_method() {
    //do anything you want
  }

  @before_save
  method_called_before_save() {
    // do some stuff
  }

  get role() {
    return super.role || new NullRole()
  }

}

export ActiveRecord(User)
```

No, I have no idea what the hell I'm doing. Just bored and what to
write some bootyful havascript.
