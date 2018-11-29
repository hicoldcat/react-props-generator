'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propsGenerator = require('./propsGenerator');

var _propsGenerator2 = _interopRequireDefault(_propsGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mock = require('mockjs');

var FakePropsValue = {};

// DEFAULT VALUE
FakePropsValue['array'] = function (propName, propType, arg) {
  return Mock.mock({
    "array|1-10": ["Mock.js"]
  })['array'];
};

FakePropsValue['bool'] = function (propName, propType, arg) {
  return Mock.mock({
    "boolean|1": true
  })['boolean'];
};

FakePropsValue['func'] = function (propName, propType, arg) {
  return function () {};
};

FakePropsValue['number'] = function (propName, propType, arg) {
  return Mock.mock({
    "number|+1": 202
  })['number'];
};

FakePropsValue['object'] = function (propName, propType, arg) {
  return {};
};

FakePropsValue['string'] = function (propName, propType, arg) {
  return Mock.mock({
    "string|1-10": "★"
  })['string'];
};

FakePropsValue['symbol'] = function (propName, propType, arg) {
  return Symbol();
};

FakePropsValue['element'] = function (propName, propType, arg) {
  return _react2.default.createElement('div');
};

// 默认使用element来作为node默认值
FakePropsValue['node'] = function (propName, propType, arg) {
  return FakePropsValue['element'](propName, propType, arg);
};

// 默认使用string来作为any默认值
FakePropsValue['any'] = function (propName, propType, arg) {
  return FakePropsValue['string'](propName, propType, arg);
};

FakePropsValue['oneOf'] = function (propName, propType, arg) {
  return arg[0] ? arg[0] : null;
};

FakePropsValue['arrayOf'] = function (propName, propType, arg) {
  return arg.proptype ? [FakePropsValue[arg.proptype](propName, propType, arg)] : [];
};

FakePropsValue['objectOf'] = function (propName, propType, arg) {
  return arg.proptype ? { key: FakePropsValue[arg.proptype](propName, propType, arg) } : {};
};

FakePropsValue['oneOfType'] = function (propName, propType, arg) {
  return arg[0] && arg[0].proptype ? FakePropsValue[arg[0].proptype](propName, propType, arg) : FakePropsValue['any'](propName, propType, arg);
};

FakePropsValue['instanceOf'] = function (propName, propType, arg) {
  return arg ? new arg() : null;
};

FakePropsValue['shape'] = function (propName, propType, arg, _ref) {
  var configOptions = _ref.configOptions;

  return arg ? (0, _propsGenerator2.default)(undefined, arg, configOptions) : {};
};

// 默认使用shape来生成exact
FakePropsValue['exact'] = function (propName, propType, arg, source) {
  return FakePropsValue['shape'](propName, propType, arg, source);
};

exports.default = FakePropsValue;