'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = undefined;

var _propTypesWarper = require('./propTypesWarper');

var _propTypesWarper2 = _interopRequireDefault(_propTypesWarper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * API: 
 * 
 * initPropTypes: Init PropTypes with 'proptype' key and save generate config to sessinStorage.
 * @param configOptions //React props generator config options
 *   false: Default value. Use default value to init props.
 *   true: Fake Data. Default use mockjs to init props.
 *   object: Custome config.  eg { any: function () {} ... }
 * 
 * 
 * defaultProps: Generate defaultProps.
 * 
*/
exports.default = _propTypesWarper2.default;
exports.defaultProps = _propTypesWarper.defaultProps;