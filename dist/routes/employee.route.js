"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _employee = _interopRequireDefault(require("../controllers/employee"));

var router = new _express.Router();
router.route('/').post(_employee["default"].addEmployee);
router.route('/:name')["delete"](_employee["default"].deleteEmployee);
router.route('/:name').put(_employee["default"].editEmployee);
router.route('/:name/activate').put(_employee["default"].activateEmployee);
router.route('/:name/suspend').put(_employee["default"].suspendEmployee);
module.exports = router;