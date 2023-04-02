const express = require('express');
const entriesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { addEntry, updateEntry, deleteEntry } = require('../controllers/entries.controller');

entriesRouter.post('/addEntry', auth, addEntry);
entriesRouter.put('/updateEntry', auth, updateEntry);
entriesRouter.delete('/deleteEntry', auth, deleteEntry);

module.exports = entriesRouter;