import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import DataGrid from 'components/table/DataGrid'
import Schema from 'schemas/TasksTableSchema'
// import Filter from 'utils/Filter'

/* eslint import/no-webpack-loader-syntax: 0 */
import FilterWorker from 'worker-loader!web-workers/filterWorker'

class Tasks extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false,
      allItems: [],
      items: [],
      selected: [],
      searchValue: '',
      orderBy: null,
      order: null
    }

    this.worker = new FilterWorker()
    this.worker.onmessage = this.handleWorkerResponse
    this.worker.postMessage({type: 'init-data'})
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.items.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
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

  handleSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const items = this.state.items.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy])
    )

    this.setState({items, order, orderBy})
  }

  handleSearch = (event) => {
    const searchValue = event.target.value
    console.log(searchValue)

    this.worker.postMessage({
      type: 'filter', searchValue: searchValue, items: this.state.allItems
    })

    // const filteredItems = Filter(this.state.allItems, searchValue)
    // this.setState({items: filteredItems})
  }

  handleWorkerResponse = (msg) => {
    const data = msg.data

    switch (data.type) {
      case 'filter':
        this.setState({items: data.items})
        break;
      case 'init-data':
        this.setState({allItems: data.items, items: data.items})
        break;
      default:
        console.log('Unknown msg in worker response')
        break;
    }
  }

  isSelected = id => {
    const {selected} = this.state
    return selected.indexOf(id) > -1
  }

  render () {
    const {items, orderBy, order, selected} = this.state

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField label='Search'
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
