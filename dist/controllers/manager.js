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

var _validation = require("./validator/validation");

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
        var _registerValidation, error, exist, email_exist, id_exist, salt, hashedPassword, manager, mailOption, saved_data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _registerValidation = (0, _validation.registerValidation)(req.body), error = _registerValidation.error;

                if (!error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  msg: error.details[0].message
                }));

              case 3:
                _context.next = 5;
                return _manager["default"].findOne({
                  employeeName: req.body.employeeName
                });

              case 5:
                exist = _context.sent;

                if (!exist) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.json({
                  msg: "you already have an account as manager, login instead"
                }));

              case 8:
                _context.next = 10;
                return _manager["default"].findOne({
                  email: req.body.email
                });

              case 10:
                email_exist = _context.sent;

                if (!email_exist) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", res.json({
                  msg: "your email already used by onother manager"
                }));

              case 13:
                _context.next = 15;
                return _manager["default"].findOne({
                  idNumber: req.body.idNumber
                });

              case 15:
                id_exist = _context.sent;

                if (!id_exist) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt("return", res.json({
                  msg: "you are using an already used id number"
                }));

              case 18:
                _context.next = 20;
                return _bcryptjs["default"].genSalt(10);

              case 20:
                salt = _context.sent;
                _context.next = 23;
                return _bcryptjs["default"].hash(req.body.password, salt);

              case 23:
                hashedPassword = _context.sent;
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

                _mailer["default"].sendMail(mailOption, function (err, info) {
                  if (err) console.log(err);
                  console.log(info);
                });

                _context.prev = 27;
                _context.next = 30;
                return manager.save();

              case 30:
                saved_data = _context.sent;
                res.json(saved_data);
                _context.next = 37;
                break;

              case 34:
                _context.prev = 34;
                _context.t0 = _context["catch"](27);
                res.json(console.log(_context.t0));

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[27, 34]]);
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
                  employeeName: req.body.employeeName
                });

              case 2:
                manager = _context2.sent;

                if (manager) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.json({
                  msg: "first register as manager to continue"
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