"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _manager = _interopRequireDefault(require("../controllers/manager"));

var router = new _express.Router();
router.route('/register').post(_manager["default"].register);
router.route('/login').post(_manager["default"].login);
module.exports = router;