"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Check params isUndefined and isAcceptType
*/
var paramsCheck = function paramsCheck(target, alise) {
  var acceptType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var type = typeof target === "undefined" ? "undefined" : _typeof(target);
  if (target === undefined) {
    throw new TypeError("ReactPropsGenerator Error: " + alise + " must be provide.");
  } else if (acceptType.indexOf(type) === -1) {
    throw new TypeError("ReactPropsGenerator Error: Invalid type " + type + " of " + alise + ", expected type " + acceptType.toString() + ".");
  }
};

exports.default = paramsCheck;