import React from 'react'
import PropTypes from 'prop-types'
import {TableRow, TableCell} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const DataGridRow = props => {
  const {item, columns, isSelected, onSelectClick} = props

  const createSelectHandler = id => event => onSelectClick(id)

  return (
    <TableRow selected={isSelected(item.id)}>
      <TableCell checkbox onClick={createSelectHandler(item.id)}>
        <Checkbox checked={isSelected(item.id)} />
      </TableCell>
      {columns.map(column =>
        <TableCell key={column.property}>{item[column.property]}</TableCell>
      )}
    </TableRow>
  )
}

DataGridRow.propTypes = {
  columns: PropTypes.array,
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectClick: PropTypes.func.isRequired
}

DataGridRow.defaultProps = {
  columns: []
}

export default DataGridRow
