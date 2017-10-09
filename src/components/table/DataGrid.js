import React from 'react'
import PropTypes from 'prop-types'
import Table, {
  TableBody,
  TableRow,
  TableCell
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'
import SortableTableHead from './SortableTableHead'

const DataGrid = props => {
  const {items, columns, isSelected, onSelectClick} = props

  const createSelectHandler = id => event => onSelectClick(id)

  return (
    <Table>
      <SortableTableHead {...props} />
      <TableBody>
        {items.map(item =>
          <TableRow key={item.id} selected={isSelected(item.id)}>
            <TableCell checkbox onClick={createSelectHandler(item.id)}>
              <Checkbox checked={isSelected(item.id)} />
            </TableCell>
            {columns.map(column =>
              <TableCell key={column.property}>{item[column.property]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

DataGrid.propTypes = {
  sortColumn: PropTypes.string,
  items: PropTypes.array,
  columns: PropTypes.array,
  isSelected: PropTypes.func.isRequired,
  onSelectClick: PropTypes.func.isRequired
}

DataGrid.defaultProps = {
  columns: [],
  items: [],
  sortColumn: ''
}

export default DataGrid
