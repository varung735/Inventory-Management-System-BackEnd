const express = require('express');
const employeesRouter = express.Router();

const { addEmployees } = require('../controllers/employees.controller');

employeesRouter.post('/addEmployee', addEmployees);

module.exports = employeesRouter;