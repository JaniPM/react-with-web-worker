function sort (items, orderBy, order) {
  return items.sort((a, b) => {
    const valA = a[orderBy]
    const valB = b[orderBy]

    if (typeof valA === 'string' || typeof valB === 'string') {
      return stringCompare(valA, valB, order)
    }

    return order === 'asc' ? valA > valB : valA < valB
  })
}

function stringCompare (a, b, order) {
  let result = (a + '').toLowerCase().localeCompare((b + '').toLowerCase())

  if (order === 'desc') {
    result *= -1
  }

  return result
}

export default sort
