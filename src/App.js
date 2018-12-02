import React, { Component } from 'react'
import './App.css'
import TestWithDefaultProps from './example/TestWithDefaultProps'
import TestWithFakeProps from './example/TestWithFakeProps'
import TestWithCustomProps from './example/TestWithCustomProps'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <TestWithDefaultProps />
        <TestWithFakeProps />
        <TestWithCustomProps />
      </div>
    )
  }
}

export default App
