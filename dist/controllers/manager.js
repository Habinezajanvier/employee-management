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

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));

var _mailer = _interopRequireDefault(require("../mailer/mailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

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
      _regenerator["default"].mark(function _callee2(req, res) {
        var exist, email_exist, id_exist, salt, hashedPassword, manager, mailOption;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _manager["default"].findOne({
                  employeeName: req.body.employeeName
                });

              case 2:
                exist = _context2.sent;

                if (!exist) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: "you already have an account as manager, login instead"
                }));

              case 5:
                _context2.next = 7;
                return _manager["default"].findOne({
                  email: req.body.email
                });

              case 7:
                email_exist = _context2.sent;

                if (!email_exist) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: "your email already used by onother manager"
                }));

              case 10:
                _context2.next = 12;
                return _manager["default"].findOne({
                  idNumber: req.body.idNumber
                });

              case 12:
                id_exist = _context2.sent;

                if (!id_exist) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: "you are using an already used id number"
                }));

              case 15:
                _context2.next = 17;
                return _bcryptjs["default"].genSalt(10);

              case 17:
                salt = _context2.sent;
                _context2.next = 20;
                return _bcryptjs["default"].hash(req.body.password, salt);

              case 20:
                hashedPassword = _context2.sent;
                //instantiating db_data to be submitted;
                manager = new _manager["default"]({
                  employeeName: req.body.employeeName,
                  idNumber: req.body.idNumber,
                  email: req.body.email,
                  password: hashedPassword,
                  position: req.body.position,
                  status: req.body.status,
                  birthDate: req.body.birthDate
                }); //sending email for confirmation

                mailOption = {
                  from: process.env.EMAIL,
                  to: req.body.email,
                  subject: "registration verification",
                  text: 'here is the email to verify your registration'
                };

                _mailer["default"].sendMail(mailOption,
                /*#__PURE__*/
                function () {
                  var _ref = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee(err, info) {
                    var saved_data;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (err) res.json(err);
                            _context.prev = 1;
                            _context.next = 4;
                            return manager.save();

                          case 4:
                            saved_data = _context.sent;
                            res.json({
                              msg: 'you are successfully registered as manager'
                            });
                            _context.next = 11;
                            break;

                          case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](1);
                            res.status(500).json({
                              msg: 'internal error, try again later'
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

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
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
      _regenerator["default"].mark(function _callee3(req, res) {
        var manager, valid_password, secretKey, token;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _manager["default"].findOne({
                  employeeName: req.body.employeeName
                });

              case 2:
                manager = _context3.sent;

                if (manager) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.json({
                  msg: "first register as manager to continue"
                }));

              case 5:
                _context3.next = 7;
                return _bcryptjs["default"].compare(req.body.password, manager.password);

              case 7:
                valid_password = _context3.sent;

                if (valid_password) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", res.json({
                  msg: "your password is not correct"
                }));

              case 10:
                try {
                  secretKey = process.env.SECRET_KEY;
                  token = _jsonwebtoken["default"].sign({
                    _id: manager._id
                  }, secretKey, {
                    algorithm: "HS256"
                  });
                  res.header("authentication", token).json({
                    token: token
                  });
                } catch (error) {
                  res.json({
                    msg: "internal error, please try again"
                  });
                }

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function login(_x5, _x6) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return ManagerController;
}();

var _default = ManagerController;
exports["default"] = _default;