const mongoose = require('mongoose');

const managerShcema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: true,
        max: 16,
        min: 16
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
        type: String,
        default: 'active',
        required: true
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