const express = require('express');
const indexRouterV1 = express.Router();

const userRouter = require('./users/user.routes');
const billRouter = require('./billing/bill.routes');

indexRouterV1.use('/users', userRouter);
indexRouterV1.use('/bills', billRouter);

module.exports = indexRouterV1;