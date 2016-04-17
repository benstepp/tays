import { Quoting } from './quoting'
import { Binding } from './binding'
import { include } from '../../../meta'

@include(Quoting, Binding)
class PostgresqlEngine {}

export { PostgresqlEngine }
