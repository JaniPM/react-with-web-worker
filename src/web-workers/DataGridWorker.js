/* eslint no-undef: 0 */
import InitData from 'utils/InitData'
import Filter from 'utils/Filter'
import Sort from 'utils/Sort'
import {INIT_DATA, SORT, FILTER} from './WorkerMsg'

onmessage = function (msg) {
  handleMessage(msg)
}

function handleMessage (msg) {
  const data = msg.data
  let items

  switch (data.type) {
    case INIT_DATA:
      console.log('Handling msg init-data')

      items = InitData(10000)
      postMessage({type: INIT_DATA, items: items})

      break;
    case FILTER:
      console.log('Handling msg filter')

      items = Filter(data.items, data.searchValue)
      postMessage({type: FILTER, items: items})

      break;
    case SORT:
      console.log('Handling msg sort')

      items = Sort(data.items, data.orderBy, data.order)
      postMessage({type: SORT, items: items})

      break;
    default:
      console.error('Unknown msg')
      break;
  }
}
