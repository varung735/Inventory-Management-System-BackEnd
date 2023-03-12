require('dotenv').config();
const {connectToDB} = require('./config/database');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const employeesRouter = require('./routes/employees.routes');
const inventoriesRouter = require('./routes/inventories.routes');
const salesRouter = require('./routes/sales.routes');
const purchasesRouter = require('./routes/purchases.routes');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

app.use('/employees', employeesRouter);
app.use('/inventories', inventoriesRouter);
app.use('/sales', salesRouter);
app.use('/purchases', purchasesRouter);

module.exports = app;