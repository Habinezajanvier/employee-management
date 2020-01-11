"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _joi = _interopRequireDefault(require("@hapi/joi"));

var registerValidation = function registerValidation(data) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    idNumber: _joi["default"].string().required().min(16).max(16),
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required(),
    position: _joi["default"].string().required(),
    status: _joi["default"].string(),
    birthDate: _joi["default"].string()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;