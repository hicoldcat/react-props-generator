import React from 'react';
import propsGenerator from './propsGenerator';
const DefaultPropsValue = {}; // DEFAULT VALUE

DefaultPropsValue['array'] = function (propName, propType, arg) {
  return [];
};

DefaultPropsValue['bool'] = function (propName, propType, arg) {
  return true;
};

DefaultPropsValue['func'] = function (propName, propType, arg) {
  return function () {};
};

DefaultPropsValue['number'] = function (propName, propType, arg) {
  return 1;
};

DefaultPropsValue['object'] = function (propName, propType, arg) {
  return {};
};

DefaultPropsValue['string'] = function (propName, propType, arg) {
  return '';
};

DefaultPropsValue['symbol'] = function (propName, propType, arg) {
  return Symbol('');
};

DefaultPropsValue['element'] = function (propName, propType, arg) {
  return React.createElement('div');
}; // 默认使用element来作为node默认值


DefaultPropsValue['node'] = function (propName, propType, arg) {
  return DefaultPropsValue['element'](propName, propType, arg);
}; // 默认使用string来作为any默认值


DefaultPropsValue['any'] = function (propName, propType, arg) {
  return DefaultPropsValue['string'](propName, propType, arg);
};

DefaultPropsValue['oneOf'] = function (propName, propType, arg) {
  return arg[0] ? arg[0] : null;
};

DefaultPropsValue['arrayOf'] = function (propName, propType, arg) {
  return arg.proptype ? [DefaultPropsValue[arg.proptype](propName, propType, arg)] : [];
};

DefaultPropsValue['objectOf'] = function (propName, propType, arg) {
  return arg.proptype ? {
    key: DefaultPropsValue[arg.proptype](propName, propType, arg)
  } : {};
};

DefaultPropsValue['oneOfType'] = function (propName, propType, arg) {
  return arg[0] && arg[0].proptype ? DefaultPropsValue[arg[0].proptype](propName, propType, arg) : DefaultPropsValue['any'](propName, propType, arg);
};

DefaultPropsValue['instanceOf'] = function (propName, propType, Arg) {
  return Arg ? new Arg() : null;
};

DefaultPropsValue['shape'] = function (propName, propType, arg, {
  configOptions
}) {
  return arg ? propsGenerator(undefined, arg, configOptions) : {};
}; // 默认使用shape来生成exact


DefaultPropsValue['exact'] = function (propName, propType, arg, source) {
  return DefaultPropsValue['shape'](propName, propType, arg, source);
};

export default DefaultPropsValue;