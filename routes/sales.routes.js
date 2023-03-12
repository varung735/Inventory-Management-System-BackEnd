const express = require('express');
const salesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { getSales, addSales, updateSales, deleteSales } = require('../controllers/sales.controller');

salesRouter.get('/getSales', auth, getSales);
salesRouter.post('/addSales', auth, addSales);
salesRouter.put('/updateSales/:id', auth, updateSales);
salesRouter.delete('/deleteSales/:id', auth, deleteSales);

module.exports = salesRouter;