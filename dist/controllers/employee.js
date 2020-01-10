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

var _mailer = _interopRequireDefault(require("../mailer/mailer"));

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
      _regenerator["default"].mark(function _callee2(req, res) {
        var existed_employee, employee, mailOption;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _employee["default"].findOne({
                  employeeName: req.body.employeeName
                });

              case 2:
                existed_employee = _context2.sent;

                if (!existed_employee) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: "employee with name is ".concat(req.body.employeeName, " already exist")
                }));

              case 5:
                employee = new _employee["default"]({
                  employeeName: req.body.employeeName,
                  idNumber: req.body.idNumber,
                  phoneNumber: req.body.phoneNumber,
                  email: req.body.email,
                  status: req.body.status,
                  birthDate: req.body.birthDate,
                  position: req.body.position
                });
                mailOption = {
                  from: process.env.EMAIL,
                  to: req.body.email,
                  subject: "notification email",
                  text: 'this an email to notify about your employement'
                };

                _mailer["default"].sendMail(mailOption,
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(err, info) {
                    var saved_employee;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (err) console.log(err);
                            _context.prev = 1;
                            _context.next = 4;
                            return employee.save();

                          case 4:
                            saved_employee = _context.sent;
                            res.json(saved_employee);
                            _context.next = 11;
                            break;

                          case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](1);
                            res.json({
                              msg: "employee not saved, \n be sure you are online and try again"
                            });

                          case 11:
                            ;

                          case 12:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[1, 8]]);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
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
      _regenerator["default"].mark(function _callee3(req, res) {
        var be_deleted;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _employee["default"].findOneAndRemove({
                  employeeName: req.params.name
                });

              case 3:
                be_deleted = _context3.sent;
                res.json({
                  msg: "employee whose name is ".concat(req.params.name, " is deleted")
                });
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                res.json({
                  msg: "internal error try again please"
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function deleteEmployee(_x5, _x6) {
        return _deleteEmployee.apply(this, arguments);
      }

      return deleteEmployee;
    }()
  }, {
    key: "editEmployee",
    value: function () {
      var _editEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var update_employee;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    birthDate: req.body.birthDate,
                    position: req.body.position
                  }
                });

              case 3:
                update_employee = _context4.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been successfully edited")
                });
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function editEmployee(_x7, _x8) {
        return _editEmployee.apply(this, arguments);
      }

      return editEmployee;
    }()
  }, {
    key: "activateEmployee",
    value: function () {
      var _activateEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var activated_employee;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    status: req.body.status
                  }
                });

              case 3:
                activated_employee = _context5.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been activeted successfully")
                });
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      function activateEmployee(_x9, _x10) {
        return _activateEmployee.apply(this, arguments);
      }

      return activateEmployee;
    }()
  }, {
    key: "suspendEmployee",
    value: function () {
      var _suspendEmployee = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var activated_employee;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _employee["default"].updateOne({
                  employeeName: req.params.name
                }, {
                  $set: {
                    status: req.body.status
                  }
                });

              case 3:
                activated_employee = _context6.sent;
                res.json({
                  msg: "".concat(req.params.name, " have been desactiveted successfully")
                });
                _context6.next = 10;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                console.log(_context6.t0);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 7]]);
      }));

      function suspendEmployee(_x11, _x12) {
        return _suspendEmployee.apply(this, arguments);
      }

      return suspendEmployee;
    }()
  }]);
  return EmployeeController;
}();

;
var _default = EmployeeController;
exports["default"] = _default;