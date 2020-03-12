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

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _manager = _interopRequireDefault(require("../../models/manager"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var ManagerController =
/*#__PURE__*/
function () {
  function ManagerController() {
    (0, _classCallCheck2["default"])(this, ManagerController);
  }

  (0, _createClass2["default"])(ManagerController, null, [{
    key: "register",
    value: function () {
      var _register = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var exist, id_exist, salt, hashedPassword, manager, saved_data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _manager["default"].findOne({
                  email: req.body.email
                });

              case 2:
                exist = _context.sent;

                if (!exist) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.json({
                  error: 'You already have an account as manager, login instead'
                }));

              case 5:
                _context.next = 7;
                return _manager["default"].findOne({
                  idNumber: req.body.idNumber
                });

              case 7:
                id_exist = _context.sent;

                if (!id_exist) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", res.json({
                  error: 'You are using an already used ID number'
                }));

              case 10:
                if (!(req.body.idNumber.length != 16)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  error: 'ID Number must 16 character'
                }));

              case 12:
                _context.next = 14;
                return _bcryptjs["default"].genSalt(10);

              case 14:
                salt = _context.sent;
                _context.next = 17;
                return _bcryptjs["default"].hash(req.body.password, salt);

              case 17:
                hashedPassword = _context.sent;
                //instantiating db_data to be submitted;
                manager = new _manager["default"]({
                  employeeName: req.body.employeeName,
                  idNumber: req.body.idNumber,
                  email: req.body.email,
                  password: hashedPassword,
                  position: req.body.position,
                  birthDate: req.body.birthDate
                });
                _context.prev = 19;
                _context.next = 22;
                return manager.save();

              case 22:
                saved_data = _context.sent;
                res.json({
                  msg: 'You are successfully registered as manager'
                });
                _context.next = 29;
                break;

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](19);
                res.status(500).json({
                  error: 'Internal error, try again later'
                });

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[19, 26]]);
      }));

      function register(_x, _x2) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var manager, valid_password, secretKey, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _manager["default"].findOne({
                  email: req.body.email
                });

              case 2:
                manager = _context2.sent;

                if (manager) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: 'First register as manager to continue'
                }));

              case 5:
                _context2.next = 7;
                return _bcryptjs["default"].compare(req.body.password, manager.password);

              case 7:
                valid_password = _context2.sent;

                if (valid_password) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: 'Your password is incorrect'
                }));

              case 10:
                try {
                  secretKey = process.env.SECRET_KEY;
                  token = _jsonwebtoken["default"].sign({
                    _id: manager._id
                  }, secretKey, {
                    algorithm: 'HS256'
                  });
                  res.header('authentication', token).json({
                    token: token
                  });
                } catch (error) {
                  res.json({
                    msg: 'Internal error, please try again'
                  });
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return ManagerController;
}();

var _default = ManagerController;
exports["default"] = _default;