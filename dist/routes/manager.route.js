"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _manager = _interopRequireDefault(require("../controllers/manager"));

var _validation = require("./validator/validation");

var router = new _express.Router();
router.route('/register').post(_validation.registerValidation, _manager["default"].register);
router.route('/login').post(_validation.loginValidation, _manager["default"].login);
module.exports = router;