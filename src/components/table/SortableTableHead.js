import React from 'react'
import PropTypes from 'prop-types'
import {TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const SortableTableHead = props => {
  const { columns,
          onSelectAllClick,
          order,
          orderBy,
          numSelected,
          numTotal,
          onSort} = props

  const createSortHandler = property => event => {
    onSort(event, property)
  }

  const isAllSelected = () => numSelected === numTotal

  const isSomeSelected = () => numSelected < numTotal && numSelected > 0

  const isSortActive = (column) => orderBy === column.property

  return (
    <TableHead>
      <TableRow>
        <TableCell checkbox>
          {numTotal > 0 &&
          <Checkbox
            indeterminate={isSomeSelected()}
            checked={isAllSelected()}
            onChange={onSelectAllClick} />
          }
        </TableCell>
        {columns.map(column => {
          return (
            <TableCell key={column.property}>
              <TableSortLabel
                active={isSortActive(column)}
                direction={order}
                onClick={createSortHandler(column.property)}>
                {column.label}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

SortableTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numTotal: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  columns: PropTypes.array
}

SortableTableHead.defaultProps = {
  columns: []
}

export default SortableTableHead
