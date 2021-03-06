"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.employeeValidation = exports.loginValidation = exports.registerValidation = void 0;

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

exports.registerValidation = registerValidation;

var loginValidation = function loginValidation(data) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    password: _joi["default"].string().required()
  });

  return schema.validate(data);
};

exports.loginValidation = loginValidation;

var employeeValidation = function employeeValidation(data) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    idNumber: _joi["default"].string().required().min(16).max(16),
    email: _joi["default"].string().required().email(),
    phoneNumber: _joi["default"].string().min(12).max(13),
    password: _joi["default"].string().required(),
    position: _joi["default"].string().required(),
    status: _joi["default"].string(),
    date: _joi["default"].string().required(),
    month: _joi["default"].string().required(),
    year: _joi["default"].string().required()
  });

  return schema.validate(data);
};

exports.employeeValidation = employeeValidation;