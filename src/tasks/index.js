import React from 'react'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import DataGrid from 'components/table/DataGrid'
import Schema from './TasksTableSchema'
import InitData from 'utils/InitData'
import Filter from 'utils/Filter'
import Sort from 'utils/Sort'

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
  }

  componentDidMount () {
    const items = InitData(100000)
    this.setState({allItems: items, items: items})
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

    const items = Sort(this.state.items, orderBy, order)

    this.setState({items, order, orderBy})
  }

  handleSearch = (event) => {
    const searchValue = event.target.value
    const items = Filter(this.state.allItems, searchValue)

    this.setState({items})
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
