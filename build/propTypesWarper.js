'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultProps = exports.defineProperty = exports.defineProperties = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _generators = require('./generators');

var _generators2 = _interopRequireDefault(_generators);

var _propsGenerator = require('./propsGenerator');

var _propsGenerator2 = _interopRequireDefault(_propsGenerator);

var _paramsCheck = require('./paramsCheck');

var _paramsCheck2 = _interopRequireDefault(_paramsCheck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultProps = {};

var cloneDeep = require('lodash.clonedeep');

/**
 * Define Properties
*/
var defineProperties = exports.defineProperties = function defineProperties(object, prop, value) {
  defineProperty(object, prop, value);
  defineProperty(object.isRequired, prop, value);
  return object;
};

/**
 * Define Property
*/
var defineProperty = exports.defineProperty = function defineProperty(object, prop, value) {
  Object.defineProperty(object, prop, {
    value: value,
    enumerable: true
  });
};

/**
 * Warper propTypes object with 'proptype' key
*/
var propTypesWraper = function propTypesWraper(configOptions) {

  // configOptions check
  var options = null;
  if (configOptions === undefined) {
    options = false;
  } else {
    (0, _paramsCheck2.default)(configOptions, 'React props generator config options', ['boolean', 'object']);
    options = configOptions;
  }

  // Set configOptions to sessionStorage
  if (!window.sessionStorage) {
    throw Error('ReactPropsGenerator Error: window.sessionStorage is undefined.');
  }
  window.sessionStorage.setItem('ReactPropsGeneratorConfig', JSON.stringify(options));

  var Generator = (0, _generators2.default)(options);

  if ((typeof Generator === 'undefined' ? 'undefined' : _typeof(Generator)) !== 'object') {
    throw new TypeError('ReactPropsGenerator Error: Generator must be object.');
  }

  var array = Object.keys(Generator);
  var original = cloneDeep(_propTypes2.default);

  var _loop = function _loop(index) {
    var key = array[index];

    if (!_propTypes2.default[key]) return {
        v: void 0
      };

    // Add field 'proptype' to PropTypes[key]
    if (_propTypes2.default[key].isRequired !== undefined) {
      _propTypes2.default[key] = defineProperties(_propTypes2.default[key], 'proptype', key);
    } else {
      _propTypes2.default[key] = function (arg) {
        var res = original[key](arg);
        res = defineProperties(res, 'proptype', key);
        res = defineProperties(res, 'arg', arg);
        return res;
      };
    }
  };

  for (var index = 0; index < array.length; index++) {
    var _ret = _loop(index);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  // Add setter methods to component propTypes and defaultProps
  return function (target) {
    // React Component Type Check
    (0, _paramsCheck2.default)(target, 'React Component', ['function']);

    // Define Setter of Target Component propTypes 
    Object.defineProperty(target, 'propTypes', {
      set: function set(newValue) {
        if (!window.sessionStorage) {
          throw new Error('ReactPropsGenerator Error: window.sessionStorage is undefined.');
        }

        var ReactPropsGeneratorConfig = window.sessionStorage.getItem('ReactPropsGeneratorConfig');
        if (!ReactPropsGeneratorConfig) {
          throw new Error('ReactPropsGenerator Error: initPropTypes must be called before define propTypes.');
        }

        var config = {};
        try {
          config = JSON.parse(ReactPropsGeneratorConfig);
        } catch (error) {
          throw new Error('ReactPropsGenerator Error: GeneratorConfig can\'t be parse.');
        }

        exports.defaultProps = defaultProps = (0, _propsGenerator2.default)(target, newValue, config);
      }
    });
    return target;
  };
};

exports.default = propTypesWraper;
exports.defaultProps = defaultProps;