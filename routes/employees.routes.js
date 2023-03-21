const express = require('express');
const employeesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { addEmployees, login, updateEmployees, deleteEmployees, getEmployees, logout, getEmployeeById } = require('../controllers/employees.controller');

employeesRouter.post('/login', login);
employeesRouter.get('/logout', auth, logout);
employeesRouter.get('/getEmployees', auth, getEmployees);
employeesRouter.get('/getEmployee/:id', auth, getEmployeeById);
employeesRouter.post('/addEmployee', auth, addEmployees);
employeesRouter.put('/updateEmployee/:id', auth, updateEmployees);
employeesRouter.delete('/deleteEmployee/:id', auth, deleteEmployees);

module.exports = employeesRouter;