const mongoose = require('mongoose');

const managerShcema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        maxLength: 16,
        minLength: 16,
        unique: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    birthDate:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true,
    },
    position: {
        type: String,
        required: true,
        default: 'manager'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Manager', managerShcema);