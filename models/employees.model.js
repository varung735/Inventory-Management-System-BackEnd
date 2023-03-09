const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    emp_name: {
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    aadhar_no: {
        type: Number,
        require: true,
        minLength: [12, "Aadhar Number must be less than 12 digits."]
    },
    pan_no: {
        type: String,
        require: true
    },
    ac_no: {
        type: Number,
        require: true
    },
    bank_name: {
        type: String,
        require: true
    },
    ifsc_Code: {
        type: String,
        require: true
    },
    contact_no: {
        type: Number,
        require: true,
        minLength: [10, "Contact No. must be of 10 digits"]
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    hired_on: {
        type: Date,
        require: true,
        default: Date.now
    },
    emp_status: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minLength: [10, "Passwords must be of 10 characters."],
        select: false
    },
    salary: [{
        paid_on: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('employees', employeesSchema);