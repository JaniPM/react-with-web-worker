/* eslint no-undef: 0 */

onmessage = function (msg) {
  handleMessage(msg)
}

function handleMessage (msg) {
  const data = msg.data

  switch (data.type) {
    case 'filter':
      console.log('Handling msg filter')

      const filteredItems = filter(data.items, data.searchValue)
      postMessage({type: 'filter', items: filteredItems})

      break;
    case 'init-data':
      console.log('Handling msg init-data')

      const items = initData()
      postMessage({type: 'init-data', items: items})

      break;
    default:
      console.log('Unknown msg')
      break;
  }
}

function filter (items, searchValue) {
  return items.filter((item) => {
    for (let prop in item) {
      const value = item[prop]
      if (isMatch(value, searchValue)) {
        return true
      }
    }

    return false
  })
}

function isMatch (value, searchValue) {
  const filterString = searchValue ? searchValue.toLowerCase() : ''

  if (value && typeof value === 'string') {
    return value.toLowerCase().indexOf(filterString) > -1
  }

  return false
}

function initData () {
  const items = []
  for (let i = 0; i < 5000; i++) {
    items.push({
      id: i,
      title: 'Todo ' + i,
      description: 'description ' + i,
      dueDate: new Date(),
      status: 'Not Started'
    })
  }

  return items
}
