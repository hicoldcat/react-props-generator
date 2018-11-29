import React from 'react'
import propsGenerator from './propsGenerator'
const Mock = require('mockjs')

const FakePropsValue = {}

// DEFAULT VALUE
FakePropsValue['array'] = function (propName, propType, arg) {
  return Mock.mock({
    "array|1-10": [
      "Mock.js"
    ]
  })['array']
};

FakePropsValue['bool'] = function (propName, propType, arg) {
  return Mock.mock({
    "boolean|1": true
  })['boolean']
};

FakePropsValue['func'] = function (propName, propType, arg) {
  return function () { }
};

FakePropsValue['number'] = function (propName, propType, arg) {
  return Mock.mock({
    "number|+1": 202
  })['number']
};

FakePropsValue['object'] = function (propName, propType, arg) {
  return {}
};

FakePropsValue['string'] = function (propName, propType, arg) {
  return Mock.mock({
    "string|1-10": "★"
  })['string']
};

FakePropsValue['symbol'] = function (propName, propType, arg) {
  return Symbol()
};

FakePropsValue['element'] = function (propName, propType, arg) {
  return React.createElement('div')
};

// 默认使用element来作为node默认值
FakePropsValue['node'] = function (propName, propType, arg) {
  return FakePropsValue['element'](propName, propType, arg)
};

// 默认使用string来作为any默认值
FakePropsValue['any'] = function (propName, propType, arg) {
  return FakePropsValue['string'](propName, propType, arg)
};

FakePropsValue['oneOf'] = function (propName, propType, arg) {
  return arg[0] ? arg[0] : null
};

FakePropsValue['arrayOf'] = function (propName, propType, arg) {
  return arg.proptype ? [FakePropsValue[arg.proptype](propName, propType, arg)] : []
};

FakePropsValue['objectOf'] = function (propName, propType, arg) {
  return arg.proptype ? { key: FakePropsValue[arg.proptype](propName, propType, arg) } : {}
};

FakePropsValue['oneOfType'] = function (propName, propType, arg) {
  return arg[0] && arg[0].proptype ? FakePropsValue[arg[0].proptype](propName, propType, arg) : FakePropsValue['any'](propName, propType, arg)
};

FakePropsValue['instanceOf'] = function (propName, propType, arg) {
  return arg ? new arg() : null
};

FakePropsValue['shape'] = function (propName, propType, arg, { configOptions }) {
  return arg ? propsGenerator(undefined, arg, configOptions) : {}
};

// 默认使用shape来生成exact
FakePropsValue['exact'] = function (propName, propType, arg, source) {
  return FakePropsValue['shape'](propName, propType, arg, source)
};


export default FakePropsValue
