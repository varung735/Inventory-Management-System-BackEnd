const express = require('express');
const auth = require('../../middlewares/auth.middleware');
const { GenerateCustomerBill, GetGeneratedBills } = require('./bill.controller');

const billRouter = express.Router();

billRouter.post('/generate', auth, GenerateCustomerBill);
billRouter.get('/get', auth, GetGeneratedBills);

module.exports = billRouter;