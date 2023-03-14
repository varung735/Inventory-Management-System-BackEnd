const express = require('express');
const ledgersRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { getLedgers, addLedgers, updateLedgers, deleteLedgers } = require('../controllers/ledgers.controller');

ledgersRouter.get('/getLedgers', auth, getLedgers);
ledgersRouter.post('/addLedgers', auth, addLedgers);
ledgersRouter.put('/updateLedgers/:id', auth, updateLedgers);
ledgersRouter.delete('/deleteLedgers/:id', auth, deleteLedgers);

module.exports = ledgersRouter;