"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = require("express");

var _employee = _interopRequireDefault(require("../controllers/employee"));

var _authentification = require("../controllers/authentification");

var router = new _express.Router();
router.route('/').post(_authentification.auth, _employee["default"].addEmployee);
router.route('/:name')["delete"](_authentification.auth, _employee["default"].deleteEmployee);
router.route('/:name').put(_authentification.auth, _employee["default"].editEmployee);
router.route('/:name/activate').put(_authentification.auth, _employee["default"].activateEmployee);
router.route('/:name/suspend').put(_authentification.auth, _employee["default"].suspendEmployee);
module.exports = router;