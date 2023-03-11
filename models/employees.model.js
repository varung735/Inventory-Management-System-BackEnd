const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({
    emp_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    aadhar_no: {
        type: Number,
        required: true,
        minLength: [12, "Aadhar Number must be less than 12 digits."]
    },
    pan_no: {
        type: String,
        required: true
    },
    ac_no: {
        type: Number,
        required: true
    },
    bank_name: {
        type: String,
        required: true
    },
    ifsc_code: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true,
        minLength: [10, "Contact No. must be of 10 digits"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hired_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    emp_status: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
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