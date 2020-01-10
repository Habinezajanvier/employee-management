"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerSmtpTransport = _interopRequireDefault(require("nodemailer-smtp-transport"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var transporter = _nodemailer["default"].createTransport((0, _nodemailerSmtpTransport["default"])({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'habinezajan@gmail.com',
    pass: 'janvier1998'
  },
  tls: {
    rejectUnauthorized: false
  }
}));

module.exports = transporter;