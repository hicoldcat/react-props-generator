import React, { Component } from 'react'
import PropTypes from 'prop-types'
import initPropTypes, { defaultProps } from 'react-props-generator'

const customDefine = {
  array: function (propName, propType, arg) {
    return [12,34,56]
  },
  number: function (propName, propType, arg) {
    return 999
  },
  element: function (propName, propType, arg) {
    return <span>hello element</span>
  },
}

@initPropTypes(customDefine)
class TestWithCustom extends Component {
  render() {
    console.log(this.props)
    return <div>
      <h3>TestWithCustom Component</h3>
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

TestWithCustom.propTypes = {
  arrayData: PropTypes.array,
  total: PropTypes.number,
  isMobile: PropTypes.bool,
  title: PropTypes.element,
  content: PropTypes.oneOf(['TestWithCustom', 'Component']),
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default TestWithCustom
