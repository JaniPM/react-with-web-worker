import React from 'react'
import PropTypes from 'prop-types'
import Table from 'material-ui/Table'
import ReactList from 'react-list'
import DataGridRow from './DataGridRow'
import SortableTableHead from './SortableTableHead'

const DataGrid = props => {
  const {items} = props

  const renderRow = (index, key) => {
    return <DataGridRow key={key} item={items[index]} {...props} />;
  }

  const renderTable = (renderedItems, ref) => {
    return (
      <Table>
        <SortableTableHead {...props} />
        <tbody ref={ref}>{renderedItems}</tbody>
      </Table>
    )
  }

  return (
    <ReactList
      itemsRenderer={renderTable}
      itemRenderer={renderRow}
      length={items.length}
      type='uniform'
    />
  )
}

DataGrid.propTypes = {
  items: PropTypes.array
}

DataGrid.defaultProps = {
  items: []
}

export default DataGrid
