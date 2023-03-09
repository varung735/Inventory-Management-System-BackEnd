const empModel = require('../models/employees.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

}

exports.addEmployees = async (req, res) => {
    try {
        let { emp_name, designation, address, aadhar_no, pan_no, ac_no, bank_name, ifsc_code, contact_no, email, hired_on, emp_status, role, password } = req.body;

        //if any of the fields are missing
        if (emp_name && designation && address && aadhar_no && pan_no && ac_no && bank_name && ifsc_code && contact_no && email && hired_on && emp_status && role && password) {
            res.status(400).send("All fields are required");
        }

        //if user already exists
        const isExisting = await user.findOne({ email: email });
        if (isExisting) {
            res.status(401).send("User already exists");
        }

        //encrypting password
        const encryptedPassword = await bcrypt.hash(password, 10);
        
        //creating a new entry in DB
        const newEmployee = await empModel.create({
            emp_name,
            designation,
            address,
            aadhar_no,
            pan_no,
            ac_no,
            bank_name,
            ifsc_code,
            contact_no,
            email,
            hired_on,
            emp_status,
            role,
            password: encryptedPassword
        });

        res.status(200).json({
            "success": true,
            "message": "Employee added sucessfully",
            "user": newEmployee
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot add employee",
            "error": error.message
        });
        console.log(error);
    }
}