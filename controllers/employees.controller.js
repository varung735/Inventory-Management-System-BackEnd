const empModel = require('../models/employees.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// login
exports.login = async (req, res) => {
    try {
        //taking email and password from request
        let { email, password } = req.body;

        if (!(email && password)) {
            res.status(401).send("email or password is invalid");
        }

        //checking if employee exists or not
        const employee = await empModel.findOne({ email }).select('password');

        // if employee doesn't exists
        if (!employee) {
            res.status(401).send("Employee dosn't exists");
        }

        if (employee && (bcrypt.compare(await password, employee.password))) {

            //create a token and send
            const token = jwt.sign({ id: employee._id }, JWT_SECRET_KEY, { expiresIn: '2h' });

            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.status(200).cookie("token", token, options).json({ "success": true });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "cannot login",
            "error": error.message,
        });
    }
}

//for adding the employee
exports.addEmployees = async (req, res) => {
    try {
        let { emp_name, designation, address, aadhar_no, pan_no, ac_no, bank_name, ifsc_code, contact_no, email, hired_on, emp_status, role, password } = req.body;

        //if any of the fields are missing
        if (emp_name && designation && address && aadhar_no && pan_no && ac_no && bank_name && ifsc_code && contact_no && email && hired_on && emp_status && role && password) {
            res.status(400).send("All fields are required");
        }

        //if user already exists
        const isExisting = await empModel.findOne({ email: email });
        if (isExisting) {
            res.status(401).send("Employee already exists");
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

        newEmployee.password = undefined;

        res.status(200).json({
            "success": true,
            "message": "Employee added sucessfully",
            "employee_data": newEmployee
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

//for updating the employee's data in DB
exports.updateEmployees = async (req, res) => {
    try {
        let id = req.params.id;

        //if user doesn't exists
        const isExisting = await empModel.findOne({ _id: id });
        if (!isExisting) {
            res.status(401).send("Employee doesn't exists");
        }

        const updatedEmployee = await empModel.findByIdAndUpdate(id);

        res.status(200).json({
            "success": true,
            "message": "Employee updated sucessfully",
            "employee_data": updatedEmployee
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot update employee",
            "error": error.message
        });
        console.log(error);
    }
}

//for deleting the employee from DB
exports.deleteEmployees = async (req, res) => {
    try {
        let id = req.params.id;

        //if user doesn't exists
        const isExisting = await empModel.findOne({ _id: id });
        if (!isExisting) {
            res.status(401).send("Employee doesn't exists");
        }
        
        const deletedEmployee = await empModel.findByIdAndDelete(id);

        res.status(200).json({
            "success": true,
            "message": "Employee deleted successfully",
            "employee": deletedEmployee
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot delete Employee",
            "error": error.message
        });
        console.log(error);
    }
}