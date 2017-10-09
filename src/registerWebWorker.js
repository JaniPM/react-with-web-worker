/* eslint import/no-webpack-loader-syntax: 0 */
import FilterWorker from 'worker-loader!./web-workers/filterWorker'

function register () {
  console.log('register web-worker')

  const worker = new FilterWorker()
  worker.postMessage({foo: 'foo'})
}

export default register
