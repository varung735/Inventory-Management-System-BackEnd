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
    Aadhar_No: {
        type: Number,
        require: true,
        minLength: [12, "Aadhar Number must be less than 12 digits."]
    },
    PAN_No: {
        type: String,
        require: true
    },
    Ac_No: {
        type: Number,
        require: true
    },
    Bank_Name: {
        type: String,
        require: true
    },
    IFSC_Code: {
        type: String,
        require: true
    },
    Contact_No: {
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
        maxLength: [10, "Passwords must be of 10 characters."]
    },
    salary: [{
        paid_on: {
            type: Date,
            default: Date.now
        },
        Amount: {
            type: Number
        }
    }]
});

model.exports = mongoose.model('employees', employeesSchema);