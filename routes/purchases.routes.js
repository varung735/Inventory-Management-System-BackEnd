const express = require('express');
const purchasesRouter = express.Router();
const {auth} = require('../src/middlewares/auth.middleware');

const { getPurchases, addPurchases, updatePurchases, deletePurchases } = require('../controllers/purchases.controller');

purchasesRouter.get('/getPurchases', auth, getPurchases);
purchasesRouter.post('/addPurchases', auth, addPurchases);
purchasesRouter.put('/updatePurchases/:id', auth, updatePurchases);
purchasesRouter.delete('/deletePurchases/:id', auth, deletePurchases);

module.exports = purchasesRouter;