import { include } from '../../../meta'
import { VisitingMethods } from './visiting_methods'
import { EngineDelegation } from './engine_delegation'

@include(EngineDelegation, VisitingMethods)
class Base {

  accept(ast, collector) {
    this.visit(ast, collector)
  }

  visit(node, collector) {
    //try {
    this[`visit_${node.constructor.name}`](node, collector)
    //} catch(e) {console.log(e); console.log(node) }
  }

  maybe_visit(node, collector, options = { prefix: ' ' }) {
    if (node) {
      collector.push(options.prefix)
      this.visit(node, collector)
    }
  }

  maybe_visit_many(nodes, collector, options = {}) {
    options = Object.assign({ prefix: '', delimiter: '' }, options)
    const nodes_length = nodes.length
    const last_index = nodes_length - 1
    if (nodes_length > 0) {
      collector.push(options.prefix)
      nodes.forEach((node, index) => {
        this.visit(node, collector)
        if (index !== last_index) { collector.push(options.delimiter) }
      })
    }
  }

  inject_join(nodes, collector, join_string) {
    this.maybe_visit_many(nodes, collector, { delimiter: join_string })
  }

  aggregate(name, node, collector) {
    collector.push(`${name}(`)
    if (node.distinct) { collector.push('DISTINCT ') }
    this.inject_join(node.expression, collector, ', ')
    collector.push(')')
  }
}

export { Base }
