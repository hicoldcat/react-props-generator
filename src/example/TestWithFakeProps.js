import React, { Component } from 'react'
import PropTypes from 'prop-types'
import initPropTypes, { defaultProps } from 'react-props-generator'

@initPropTypes(true)
class TestWithFakeProps extends Component {
  render() {
    console.log(this.props)
    return <div>
      <h3>TestWithFakeProps Component</h3>
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
      <div>

      </div>
    </div>
  }
}

TestWithFakeProps.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.number),
  total: PropTypes.number,
  isMobile: PropTypes.bool,
  title: PropTypes.element,
  content: PropTypes.oneOf(['TestWithFakeProps', 'Component']),
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default TestWithFakeProps
