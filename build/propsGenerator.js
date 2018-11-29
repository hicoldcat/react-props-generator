'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paramsCheck = require('./paramsCheck');

var _paramsCheck2 = _interopRequireDefault(_paramsCheck);

var _generators = require('./generators');

var _generators2 = _interopRequireDefault(_generators);

var _propTypesWarper = require('./propTypesWarper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * Generate default props and fake props data 
 * base on React components's PropTypes
 * 
 * @param target: Target Component
 * 
 * @param propTypes: Target Component propTypes defined by PropTypes
 * 
 * @param configOptions: Generate configs
 */
var propsGenerator = function propsGenerator(target, propTypes, configOptions) {
  // propTypes check
  (0, _paramsCheck2.default)(propTypes, 'React Component propTypes', ['object']);

  // Get and wraper generators
  var GENERATORS = (0, _generators2.default)(configOptions);

  var defaultProps = {};

  Object.keys(propTypes).map(function (propName) {
    var proptype = propTypes[propName].proptype;
    if (proptype && GENERATORS[proptype]) {
      var value = GENERATORS[proptype](propName, proptype, propTypes[propName].arg, {
        target: target,
        propTypes: propTypes,
        configOptions: configOptions
      });
      (0, _propTypesWarper.defineProperty)(defaultProps, propName, value);
    }
  });

  // Add defaultProps to Component
  if (target) {
    if (!target.defaultProps) {
      (0, _propTypesWarper.defineProperty)(target, 'defaultProps', defaultProps);
    } else {
      Object.assign(target.defaultProps, defaultProps);
    }
  }

  return defaultProps;
};

exports.default = propsGenerator;