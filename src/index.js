const express = require('express');
const indexRouter = express.Router();

const indexRouterV1 = require('./v1/index');

indexRouter.use('/v1', indexRouterV1);

module.exports = indexRouter;