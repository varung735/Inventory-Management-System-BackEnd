const express = require('express');
const ledgersRouter = express.Router();
const {auth} = require('../middlewares/auth');

module.exports = ledgersRouter;