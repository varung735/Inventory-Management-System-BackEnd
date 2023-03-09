const express = require('express');
const employeesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { addEmployees, login } = require('../controllers/employees.controller');

employeesRouter.get('/login', login);
employeesRouter.post('/addEmployee', auth, addEmployees);

module.exports = employeesRouter;