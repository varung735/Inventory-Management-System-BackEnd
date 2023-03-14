const express = require('express');
const stocksRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { getStocks, addStocks, updateStocks, deleteStocks } = require('../controllers/stocks.controller');

stocksRouter.get('/getStocks', auth, getStocks);
stocksRouter.post('/addStocks', auth, addStocks);
stocksRouter.put('/updateStocks/:id', auth, updateStocks);
stocksRouter.delete('/deleteStocks/:id', auth, deleteStocks);

module.exports = stocksRouter;