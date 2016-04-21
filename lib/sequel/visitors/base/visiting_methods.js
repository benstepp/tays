import { isEmpty as empty } from 'lodash'

/**
 * A class holding the methods that the default Postgres Visitor uses
 * to traverse the AST representation of the SQL Query. These methods
 * are sorted in alphabetical order and all have the same call
 * signature.
 */
class VisitingMethods {

  visit_AddColumn(node, collector) {
    collector.push('ADD COLUMN ')
    this.visit(node.expression, collector)
  }

  visit_AlterColumn(node, collector) {
    collector.push('ALTER COLUMN ')
    this.visit(node.expression, collector)
  }

  visit_AlterTableStatement(node, collector) {
    collector.push('ALTER TABLE ')
    this.visit(node.table, collector)
    this.maybe_visit_many(node.columns, collector, { prefix: ' ', delimiter: ', ' })
  }

  visit_And(node, collector) {
    this.inject_join(node.children, collector, ' AND ')
  }

  visit_Array(node, collector) {
    this.inject_join(node, collector, ', ')
  }

  visit_As(node, collector) {
    this.visit(node.left, collector)
    collector.push(' AS ')
    this.visit(node.right, collector)
  }

  visit_Ascending(node, collector) {
    this.visit(node.expression, collector)
    collector.push(' ASC')
  }

  visit_Attribute(node, collector) {
    const table_name = this.quote_table_name(node.relation.name)
    const column_name = this.quote_column_name(node.name)
    collector.push(`${table_name}.${column_name}`)
  }

  visit_Average(node, collector) {
    this.aggregate('AVG', node, collector)
  }

  visit_Bin(node, collector) {
    this.visit(node.expression, collector)
  }

  visit_BindParam(node, collector) {
    collector.add_bind()
  }

  visit_Column(node, collector) {
    collector.push(this.quote_column_name(node.name))
    this.maybe_visit(node.type, collector)
    this.maybe_visit_many(node.constraints, collector)
  }

  visit_Count(node, collector) {
    this.aggregate('COUNT', node, collector)
  }

  visit_CreateTableStatement(node, collector) {
    collector.push('CREATE TABLE ')
    this.visit(node.table, collector)
    this.maybe_visit_many(node.columns, collector, { prefix: ' (', delimiter: ', ', suffix: ')' })
  }

  visit_DefaultConstraint(node, collector) {
    if (node.dropped) collector.push(' DROP')
    if (node.altered) collector.push(' SET')
    collector.push(' DEFAULT')
    this.maybe_visit(node.expression, collector)
  }

  visit_Descending(node, collector) {
    this.visit(node.expression, collector)
    collector.push(' DESC')
  }

  visit_Distinct(node, collector) {
    collector.push('DISTINCT')
  }

  visit_DistinctOn(node, collector) {
    collector.push('DISTINCT ON (')
    this.visit(node.expression, collector)
    collector.push(')')
  }

  visit_DropColumn(node, collector) {
    collector.push('DROP COLUMN ')
    this.visit(node.expression, collector)
  }

  visit_Equality(node, collector) {
    this.visit(node.left, collector)

    if (node.right.is_null) {
      collector.push(' IS NULL')
    } else {
      collector.push(' = ')
      this.visit(node.right, collector)
    }
  }

  visit_False(node, collector) {
    collector.push('FALSE')
  }

  visit_ForShare(node, collector) {
    collector.push('FOR SHARE')
  }

  visit_ForUpdate(node, collector) {
    collector.push('FOR UPDATE')
  }

  visit_GreaterThan(node, collector) {
    this.visit(node.left, collector)
    collector.push(' > ')
    this.visit(node.right, collector)
  }

  visit_GreaterThanOrEqual(node, collector) {
    this.visit(node.left, collector)
    collector.push(' >= ')
    this.visit(node.right, collector)
  }

  visit_Group(node, collector) {
    this.visit(node.expression, collector)
  }

  visit_In(node, collector) {
    if (empty(node.right)) {
      collector.push('1=0')
    } else {
      this.visit(node.left, collector)
      collector.push(' IN (')
      this.visit(node.right, collector)
      collector.push(')')
    }
  }

  visit_JoinSource(node, collector) {
    if (node.left) {
      this.visit(node.left, collector)
    }

    if (node.right.length > 0) {
      if (node.left) { collector.push(' ') }
      this.inject_join(node.right, collector, ' ')
    }
  }

  visit_InnerJoin(node, collector) {
    collector.push('INNER JOIN ')
    this.visit(node.left, collector)
    if (node.right) {
      collector.push(' ')
      this.visit(node.right, collector)
    }
  }

  visit_LeftJoin(node, collector) {
    collector.push('LEFT JOIN ')
    this.visit(node.left, collector)
    if (node.right) {
      collector.push(' ')
      this.visit(node.right, collector)
    }
  }

  visit_Limit(node, collector) {
    collector.push('LIMIT ')
    this.visit(node.expression, collector)
  }

  visit_Maximum(node, collector) {
    this.aggregate('MAX', node, collector)
  }

  visit_Minimum(node, collector) {
    this.aggregate('MIN', node, collector)
  }

  visit_NotEqual(node, collector) {
    this.visit(node.left, collector)

    if (node.right.is_null) {
      collector.push(' IS NOT NULL')
    } else {
      collector.push(' != ')
      this.visit(node.right, collector)
    }
  }

  visit_NullConstraint(node, collector) {
    if (node.dropped) { collector.push(' DROP') }
    collector.push(' NOT NULL')
  }

  visit_Number(node, collector) {
    this.visit_SqlLiteral(node, collector)
  }

  visit_Offset(node, collector) {
    collector.push('OFFSET ')
    this.visit(node.expression, collector)
  }

  visit_On(node, collector) {
    collector.push('ON ')
    this.visit(node.expression, collector)
  }

  visit_Quoted(node, collector) {
    collector.push(this.quoted(node.expression, null))
  }

  visit_Relation(node, collector) {
    collector.push(this.quote_table_name(node.name))
  }

  visit_SelectCore(node, collector) {
    collector.push('SELECT')
    this.maybe_visit(node.top, collector)
    this.maybe_visit(node.set_quantifier, collector)
    this.maybe_visit_many(node.projections, collector, { prefix: ' ', delimiter: ', ' })

    if (node.source && !node.source.empty) {
      collector.push(' FROM ')
      this.visit(node.source, collector)
    }

    this.maybe_visit_many(node.wheres, collector, { prefix: ' WHERE ', delimiter: ' AND ' })
    this.maybe_visit_many(node.groups, collector, { prefix: ' GROUP BY ', delimiter: ', ' })
    this.maybe_visit_many(node.havings, collector, { prefix: 'HAVING', delimiter: 'AND' })
    this.maybe_visit_many(node.windows, collector, { prefix: 'WINDOW', delimiter: ', ' })
  }

  visit_SelectStatement(node, collector) {
    this.maybe_visit(node.with, collector)
    node.cores.map(core => this.visit(core, collector))
    const options = { prefix: ' ORDER BY ', delimiter: ', ' }
    this.maybe_visit_many(node.orders, collector, options)
    this.maybe_visit(node.limit, collector)
    this.maybe_visit(node.offset, collector)
    this.maybe_visit(node.lock, collector)
  }

  visit_SelectManager(node, collector) {
    collector.push(`(${node.to_sql()})`)
  }

  visit_SqlLiteral(node, collector) {
    collector.push(node.toString())
  }

  visit_Sum(node, collector) {
    this.aggregate('SUM', node, collector)
  }

  visit_Top(node, collector) {
    // noop
  }

  visit_TypeBoolean(node, collector) {
    collector.push('boolean')
  }

  visit_TypeDate(node, collector) {
    collector.push('date')
  }

  visit_TypeDatetime(node, collector) {
    collector.push('timestamps')
  }

  visit_TypePrimaryKey(node, collector) {
    collector.push('serial primary key')
  }

  visit_TypeVarchar(node, collector) {
    collector.push(`varchar(${node.length})`)
  }

}

export { VisitingMethods }
