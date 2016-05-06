import { PostgresqlAdapter } from './postgresql_adapter'

const adapters = {
  postgres: PostgresqlAdapter,
  postgresql: PostgresqlAdapter,
  pg: PostgresqlAdapter
}

export function adapter_for(name) {
  return adapters[name]
}
