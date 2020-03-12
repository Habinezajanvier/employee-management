const mongoose = require('mongoose');

const employeeShcema = mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'inactive',
  },
  birthDate: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Employee', employeeShcema);
