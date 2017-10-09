import React from 'react'

class Timer extends React.Component {
  constructor () {
    super()
    this.state = { milliseconds: 0 }
    this.timer = 0
  }

  componentDidMount () {
    if (this.timer === 0) {
      this.timer = setInterval(() => {
        const milliseconds = (this.state.milliseconds + 1) % 100
        this.setState({ milliseconds })
      }, 100)
    }
  }

  render () {
    return (
      <h3 className='app-timer'>{this.state.milliseconds}</h3>
    )
  }
}

export default Timer
