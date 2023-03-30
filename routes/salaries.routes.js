const express = require('express');
const salariesRouter =  express.Router();
const {auth} = require('../middlewares/auth');

const { getSalaries, getSalary, updateSalary, addSalary, deleteSalary } = require('../controllers/salaries.controllers');

// salariesRouter.get('/getSalaries', auth, getSalaries);
salariesRouter.get('/getSalary', auth, getSalary);
salariesRouter.post('/addSalary', auth, addSalary);
salariesRouter.put('/updateSalary', auth, updateSalary);
salariesRouter.delete('/deleteSalary', auth, deleteSalary);

module.exports = salariesRouter;