import { Base } from '../base'
import { Quoting } from './quoting'
import { Binding } from './binding'
import { include } from '../../../meta'

@include(Quoting, Binding)
class PostgresqlEngine extends Base {}

export { PostgresqlEngine }
