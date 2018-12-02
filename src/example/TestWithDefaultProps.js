import React, { Component } from 'react'
import PropTypes from 'prop-types'
import initPropTypes, {defaultProps} from '../lib'

@initPropTypes(false)
class TestWithDefaultProps extends Component {
  render () {
    console.log(this.props)
    return <div>
      <h3>TestWithDefaultProps Component</h3>
      {
        Object.keys(defaultProps).map(key => {
          return (
            <div key={key}>
              <span>{key}:   </span>
              <span>{typeof this.props[key] === 'object' ? this.props[key] : this.props[key].toString()}</span>
            </div>
          )
        })
      }
    </div>
  }
}

TestWithDefaultProps.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number,
  isMobile: PropTypes.bool,
  title: PropTypes.element,
  content: PropTypes.oneOf(['TestWithDefaultProps', 'Component']),
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
} 

export default TestWithDefaultProps
