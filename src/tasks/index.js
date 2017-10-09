/* eslint import/no-webpack-loader-syntax: 0 */
import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import DataGrid from 'components/table/DataGrid'
import Schema from 'schemas/TasksTableSchema'
import DataGridWorker from 'worker-loader!web-workers/DataGridWorker'
import {INIT_DATA, SORT, FILTER} from 'web-workers/WorkerMsg'

class Tasks extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allItems: [],
      items: [],
      selected: [],
      searchValue: '',
      orderBy: null,
      order: null
    }

    this.worker = new DataGridWorker()
    this.worker.onmessage = this.handleWorkerResponse
    this.worker.postMessage({type: INIT_DATA})
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.items.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  isSelected = id => {
    const {selected} = this.state
    return selected.indexOf(id) > -1
  }

  handleSelectClick = id => {
    const {selected} = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({selected: newSelected})
  }

  handleSort = (event, orderBy) => {
    let order = 'desc'
    if (this.state.orderBy === orderBy && this.state.order === 'desc') {
      order = 'asc'
    }

    this.worker.postMessage({
      type: SORT, items: this.state.allItems, orderBy: orderBy, order: order
    })

    this.setState({order, orderBy})
  }

  handleSearch = (event) => {
    const searchValue = event.target.value

    this.worker.postMessage({
      type: FILTER, searchValue: searchValue, items: this.state.allItems
    })
  }

  handleWorkerResponse = (msg) => {
    const data = msg.data

    switch (data.type) {
      case INIT_DATA:
        this.setState({allItems: data.items, items: data.items})
        break;
      case FILTER:
      case SORT:
        this.setState({items: data.items})
        break;
      default:
        console.log('Unknown msg in worker response')
        break;
    }
  }

  render () {
    const {items, orderBy, order, selected} = this.state

    return (
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <TextField fullWidth label='Search'
            type='search'
            onChange={this.handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <DataGrid items={items}
            columns={Schema.columns}
            orderBy={orderBy}
            order={order}
            isSelected={this.isSelected}
            onSelectAllClick={this.handleSelectAllClick}
            onSelectClick={this.handleSelectClick}
            onSort={this.handleSort}
            numSelected={selected.length}
            numTotal={items.length}/>
        </Grid>
      </Grid>
    )
  }
}

export default Tasks
