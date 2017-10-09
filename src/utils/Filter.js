const filter = (items, searchValue) => {
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

const isMatch = (value, searchValue) => {
  const filterString = searchValue ? searchValue.toLowerCase() : ''

  if (value && typeof value === 'string') {
    return value.toLowerCase().indexOf(filterString) > -1
  }

  return false
}

export default filter
