"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editValidation = exports.employeeValidation = exports.loginValidation = exports.registerValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var registerValidation = function registerValidation(req, res, next) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    idNumber: _joi["default"].number().required(),
    email: _joi["default"].string().required().email(),
    password: _joi["default"].string().required(),
    position: _joi["default"].string().required(),
    birthDate: _joi["default"].string()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error;

  if (error) return res.status(400).json({
    msg: error.details[0].message
  });
  next();
};

exports.registerValidation = registerValidation;

var loginValidation = function loginValidation(req, res, next) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    password: _joi["default"].string().required()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error;

  if (error) return res.status(400).json({
    msg: error.details[0].message
  });
  next();
};

exports.loginValidation = loginValidation;

var employeeValidation = function employeeValidation(req, res, next) {
  var schema = _joi["default"].object({
    employeeName: _joi["default"].string().required(),
    idNumber: _joi["default"].number().required(),
    email: _joi["default"].string().required().email(),
    phoneNumber: _joi["default"].string().min(12).max(13),
    position: _joi["default"].string().required(),
    status: _joi["default"].string(),
    date: _joi["default"].string().required(),
    month: _joi["default"].string().required(),
    year: _joi["default"].string().required()
  });

  var _schema$validate3 = schema.validate(req.body),
      error = _schema$validate3.error;

  if (error) return res.status(400).json({
    msg: error.details[0].message
  });
  next();
};

exports.employeeValidation = employeeValidation;

var editValidation = function editValidation(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    phoneNumber: _joi["default"].string().min(12).max(13).required(),
    position: _joi["default"].string().required(),
    date: _joi["default"].string().required(),
    month: _joi["default"].string().required(),
    year: _joi["default"].string().required()
  });

  var _schema$validate4 = schema.validate(req.body),
      error = _schema$validate4.error;

  if (error) return res.status(400).json({
    msg: error.details[0].message
  });
  next();
};

exports.editValidation = editValidation;