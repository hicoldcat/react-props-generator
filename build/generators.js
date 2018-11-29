'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _defaultPropsValue = require('./defaultPropsValue');

var _defaultPropsValue2 = _interopRequireDefault(_defaultPropsValue);

var _fakePropsValue = require('./fakePropsValue');

var _fakePropsValue2 = _interopRequireDefault(_fakePropsValue);

var _customPropsValue = require('./customPropsValue');

var _customPropsValue2 = _interopRequireDefault(_customPropsValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get Generators By Config
*/
var getGenerators = function getGenerators(arg) {
  var type = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);
  if (type === 'boolean') {
    if (arg) {
      return _fakePropsValue2.default;
    } else {
      return _defaultPropsValue2.default;
    }
  } else if (type === 'object') {
    return (0, _customPropsValue2.default)(arg);
  } else {
    return _defaultPropsValue2.default;
  }
};

exports.default = getGenerators;