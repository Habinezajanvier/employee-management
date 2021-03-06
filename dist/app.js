"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _manager = _interopRequireDefault(require("./routes/manager.route"));

var _employee = _interopRequireDefault(require("./routes/employee.route"));

var _cors = _interopRequireDefault(require("cors"));

require('dotenv').config();

var app = (0, _express["default"])(); //middlewares

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send({
    message: 'Welcome to employee management'
  });
});
app.use('/company', _manager["default"]);
app.use('/company/employees', _employee["default"]);
var port = process.env.PORT || 3000;
/**
 * connecting to mongodb database
 */

_mongoose["default"].connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) process.exit(1);
});

app.listen(port, function () {
  return console.log("our app is running, can be accessed now on http://localhost:".concat(port, "/"));
});