"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _employee = _interopRequireDefault(require("../../models/employee"));

var EmployeeController =
/*#__PURE__*/
function () {
  function EmployeeController() {
    (0, _classCallCheck2["default"])(this, EmployeeController);
  }

  (0, _createClass2["default"])(EmployeeController, null, [{
    key: "addEmployee",
    value: function () {
      var _addEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var existed_employee, existed_email, existed_id, existed_number, year, month, date, d, today, birthDate, checkNumber, employee, saved_employee;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _employee["default"].findOne({
                  employeeName: req.body.employeeName
                });

              case 2:
                existed_employee = _context.sent;

                if (!existed_employee) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: "employee with name is ".concat(req.body.employeeName, " already exist")
                }));

              case 5:
                _context.next = 7;
                return _employee["default"].findOne({
                  email: req.body.email
                });

              case 7:
                existed_email = _context.sent;

                if (!existed_email) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: "".concat(req.body.email, " already exist, use another")
                }));

              case 10:
                _context.next = 12;
                return _employee["default"].findOne({
                  idNumber: req.body.idNumber
                });

              case 12:
                existed_id = _context.sent;

                if (!existed_id) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: "".concat(req.bdoy.idNumber, " already exist, try another")
                }));

              case 15:
                if (!(req.body.idNumber.length != 16)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: 'id Number must 16 character'
                }));

              case 17:
                _context.next = 19;
                return _employee["default"].findOne({
                  phoneNumber: req.body.phoneNumber
                });

              case 19:
                existed_number = _context.sent;

                if (!existed_number) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: "".concat(req.body.phoneNumber, " already exist, use another")
                }));

              case 22:
                year = parseInt(req.body.year);
                month = parseInt(req.body.month);
                date = parseInt(req.body.date); //checking if employee is above 18

                d = new Date();
                today = d.getFullYear();

                if (!(today - year < 18)) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: "".concat(req.body.employeeName, " is below 18")
                }));

              case 29:
                birthDate = "".concat(date, "/ ").concat(month, "/ ").concat(year); //checking if phone number is rwandan

                checkNumber = /^\+250/.test(req.body.phoneNumber);

                if (!(checkNumber != true)) {
                  _context.next = 33;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: 'phone number must be a valid rwandan number (starting with +250)'
                }));

              case 33:
                //instantiating mongoose schema for db submission
                employee = new _employee["default"]({
                  employeeName: req.body.employeeName,
                  idNumber: req.body.idNumber,
                  phoneNumber: req.body.phoneNumber,
                  email: req.body.email,
                  birthDate: birthDate,
                  position: req.body.position
                });
                _context.prev = 34;
                _context.next = 37;
                return employee.save();

              case 37:
                saved_employee = _context.sent;
                res.json({
                  msg: "".concat(req.body.employeeName, " has been successfully added")
                });
                _context.next = 44;
                break;

              case 41:
                _context.prev = 41;
                _context.t0 = _context["catch"](34);
                res.json({
                  msg: "employee not saved, \n be sure you are online and try again"
                });

              case 44:
                ;

              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[34, 41]]);
      }));

      function addEmployee(_x, _x2) {
        return _addEmployee.apply(this, arguments);
      }

      return addEmployee;
    }()
  }, {
    key: "deleteEmployee",
    value: function () {
      var _deleteEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var employee, be_deleted;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _employee["default"].findOne({
                  employeeName: req.params.name
                });

              case 2:
                employee = _context2.sent;

                if (employee) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  msg: 'employee not exit'
                }));

              case 5:
                _context2.prev = 5;
                _context2.next = 8;
                return _employee["default"].findOneAndRemove({
                  employeeName: req.params.name
                });

              case 8:
                be_deleted = _context2.sent;
                res.json({
                  msg: "employee whose name is ".concat(req.params.name, " is successfully deleted")
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](5);
                res.json({
                  msg: "internal error try again please"
                });

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[5, 12]]);
      }));

      function deleteEmployee(_x3, _x4) {
        return _deleteEmployee.apply(this, arguments);
      }

      return deleteEmployee;
    }()
  }, {
    key: "editEmployee",
    value: function () {
      var _editEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var year, month, date, d, today, birthDate, checkNumber, employee, update_employee;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                year = parseInt(req.body.year);
                month = parseInt(req.body.month);
                date = parseInt(req.body.date); //checking if employee is above 18

                d = new Date();
                today = d.getFullYear();

                if (!(today - year < 18)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  msg: "".concat(req.body.employeeName, " is below 18")
                }));

              case 7:
                birthDate = "".concat(date, "/ ").concat(month, "/ ").concat(year); //checking if phone number is rwandan

                checkNumber = /^\+250/.test(req.body.phoneNumber);

                if (!(checkNumber != true)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  msg: 'phone number must be a valid rwandan number (starting with +250)'
                }));

              case 11:
                _context3.next = 13;
                return _employee["default"].findOne({
                  employeeName: req.params.name
                });

              case 13:
                employee = _context3.sent;

                if (employee) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", res.status(400).json({
                  msg: 'employee not exit'
                }));

              case 16:
                _context3.prev = 16;
                _context3.next = 19;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    birthDate: birthDate,
                    position: req.body.position
                  }
                });

              case 19:
                update_employee = _context3.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been successfully edited")
                });
                _context3.next = 26;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3["catch"](16);
                res.status(500).json({
                  msg: "internal error, please try again later"
                });

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[16, 23]]);
      }));

      function editEmployee(_x5, _x6) {
        return _editEmployee.apply(this, arguments);
      }

      return editEmployee;
    }()
  }, {
    key: "activateEmployee",
    value: function () {
      var _activateEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var employee, activated_employee;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _employee["default"].findOne({
                  employeeName: req.params.name
                });

              case 2:
                employee = _context4.sent;

                if (employee) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", res.status(400).json({
                  msg: 'employee not exit'
                }));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    status: req.body.status
                  }
                });

              case 8:
                activated_employee = _context4.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been activeted successfully")
                });
                _context4.next = 15;
                break;

              case 12:
                _context4.prev = 12;
                _context4.t0 = _context4["catch"](5);
                res.status(500).json({
                  msg: 'internal error, please try again later'
                });

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 12]]);
      }));

      function activateEmployee(_x7, _x8) {
        return _activateEmployee.apply(this, arguments);
      }

      return activateEmployee;
    }()
  }, {
    key: "suspendEmployee",
    value: function () {
      var _suspendEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var employee, activated_employee;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _employee["default"].findOne({
                  employeeName: req.params.name
                });

              case 2:
                employee = _context5.sent;

                if (employee) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", res.status(400).json({
                  msg: 'employee not exit'
                }));

              case 5:
                _context5.prev = 5;
                _context5.next = 8;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    status: req.body.status
                  }
                });

              case 8:
                activated_employee = _context5.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been desactiveted successfully")
                });
                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](5);
                res.status(500).json({
                  msg: 'internal error, please try again later'
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 12]]);
      }));

      function suspendEmployee(_x9, _x10) {
        return _suspendEmployee.apply(this, arguments);
      }

      return suspendEmployee;
    }()
  }, {
    key: "searchEmployee",
    value: function () {
      var _searchEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var searched_employee;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _employee["default"].find({
                  $or: [{
                    employeeName: req.body.field
                  }, {
                    position: req.body.field
                  }, {
                    phoneNumber: req.body.field
                  }, {
                    email: req.body.field
                  }]
                });

              case 3:
                searched_employee = _context6.sent;

                if (searched_employee) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.status(404).json({
                  msg: 'your search not found '
                }));

              case 6:
                res.json(searched_employee);
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                res.status(500).json({
                  msg: 'internal error, try again later please'
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }));

      function searchEmployee(_x11, _x12) {
        return _searchEmployee.apply(this, arguments);
      }

      return searchEmployee;
    }()
  }, {
    key: "allEmployee",
    value: function () {
      var _allEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(req, res) {
        var employees;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _employee["default"].find().select({
                  status: 0,
                  _id: 0,
                  date: 0,
                  __v: 0
                });

              case 3:
                employees = _context7.sent;

                if (employees) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", res.json({
                  msg: 'no employee start adding'
                }));

              case 6:
                res.json(employees);
                _context7.next = 12;
                break;

              case 9:
                _context7.prev = 9;
                _context7.t0 = _context7["catch"](0);
                res.status(500).json({
                  msg: 'internal error, try again later'
                });

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 9]]);
      }));

      function allEmployee(_x13, _x14) {
        return _allEmployee.apply(this, arguments);
      }

      return allEmployee;
    }()
  }]);
  return EmployeeController;
}();

;
var _default = EmployeeController;
exports["default"] = _default;