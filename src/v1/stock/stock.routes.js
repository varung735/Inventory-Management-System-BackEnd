const express = require('express');
const stockRouter = express.Router();

const auth = require('../../middlewares/auth.middleware');
const { GetStocksByAlphabet, AddStock, RestockItem, DeleteStock, SearchStock, GetStocks } = require('./stock.controller');

stockRouter.get('/get_by_alphabet', auth, GetStocksByAlphabet);
stockRouter.get('/search', auth, SearchStock);
stockRouter.get('/get', auth, GetStocks);
stockRouter.post('/add', auth, AddStock);
stockRouter.patch('/restock', auth, RestockItem);
stockRouter.delete('/delete', auth, DeleteStock);

module.exports = stockRouter;