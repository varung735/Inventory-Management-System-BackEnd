const express = require('express');
const employeesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { addEmployees, login, updateEmployees, deleteEmployees } = require('../controllers/employees.controller');

employeesRouter.get('/login', login);
employeesRouter.post('/addEmployee', auth, addEmployees);
employeesRouter.put('/updateEmployee/:id', auth, updateEmployees);
employeesRouter.delete('/deleteEmployee/:id', auth, deleteEmployees);

module.exports = employeesRouter;