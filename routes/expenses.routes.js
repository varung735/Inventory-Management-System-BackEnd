const express = require('express');
const expensesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { getExpenses, addExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenses.controller');

expensesRouter.get('/getExpenses', auth, getExpenses);
expensesRouter.post('/addExpenses', auth, addExpenses);
expensesRouter.put('/updateExpenses/:id', auth, updateExpenses);
expensesRouter.delete('/deleteExpenses/:id', auth, deleteExpenses);

module.exports = expensesRouter