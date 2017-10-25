import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Tasks from './tasks'
import Timer from 'components/Timer'

class App extends Component {
  render () {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <Timer />
        </div>
        <div className='content'>
          <Tasks />
        </div>
      </div>
    )
  }
}

export default App
