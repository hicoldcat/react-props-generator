'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultPropsValue = require('./defaultPropsValue');

var _defaultPropsValue2 = _interopRequireDefault(_defaultPropsValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACCETPTYPES = ['any', 'array', 'bool', 'func', 'number', 'object', 'string', 'node', 'element', 'symbol', 'instanceOf', 'oneOf', 'oneOfType', 'arrayOf', 'objectOf', 'shape', 'exact'];

// Use default props unless customer has defined generate props function
var CustomPropsValue = function CustomPropsValue(arg) {
  var propsValue = {};

  for (var index = 0; index < ACCETPTYPES.length; index++) {
    if (arg.hasOwnProperty(ACCETPTYPES[index])) {
      propsValue[ACCETPTYPES[index]] = arg[ACCETPTYPES[index]];
    } else if (_defaultPropsValue2.default.hasOwnProperty(ACCETPTYPES[index])) {
      propsValue[ACCETPTYPES[index]] = _defaultPropsValue2.default[ACCETPTYPES[index]];
    }
  }

  return propsValue;
};

exports.default = function (arg) {
  return CustomPropsValue(arg);
};