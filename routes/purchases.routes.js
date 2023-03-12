const express = require('express');
const purchasesRouter = express.Router();
const {auth} = require('../middlewares/auth');

const { getPurchases, addPurchases, updatePurchases, deletePurchases } = require('../controllers/purchases.controller');

purchasesRouter.get('/getPurchases', auth, getPurchases);
purchasesRouter.post('/addPurchases', auth, addPurchases);
purchasesRouter.put('/updatePurchases/:id', auth, updatePurchases);
purchasesRouter.delete('/deletePurchases/:id', auth, deletePurchases);

module.exports = purchasesRouter;