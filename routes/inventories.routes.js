const express = require('express');
const inventoriesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { addInventories, getInventories, updateInventories, deleteInventories } = require('../controllers/inventories.controller');

inventoriesRouter.get('/getInventory', auth, getInventories);
inventoriesRouter.post('/addInventory', auth, addInventories);
inventoriesRouter.put('/updateInventory/:id', auth, updateInventories);
inventoriesRouter.delete('/deleteInventory/:id', auth, deleteInventories);

module.exports = inventoriesRouter;