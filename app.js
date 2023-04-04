require('dotenv').config();
const {connectToDB} = require('./config/database');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const REQ_URL = process.env.REQ_URL

const employeesRouter = require('./routes/employees.routes');
const inventoriesRouter = require('./routes/inventories.routes');
const salesRouter = require('./routes/sales.routes');
const purchasesRouter = require('./routes/purchases.routes');
const expensesRouter = require('./routes/expenses.routes');
const stocksRouter = require('./routes/stocks.routes');
const ledgersRouter = require('./routes/ledgers.routes');
const salariesRouter = require('./routes/salaries.routes');
const entriesRouter = require('./routes/entries.router');

const corsOptions = {
    origin: REQ_URL || "http://localhost:3000",
    credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', REQ_URL);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie');
    next();
});

connectToDB();

app.use('/employees', employeesRouter);
app.use('/inventories', inventoriesRouter);
app.use('/sales', salesRouter);
app.use('/purchases', purchasesRouter);
app.use('/expenses', expensesRouter);
app.use('/stocks', stocksRouter);
app.use('/ledgers', ledgersRouter);
app.use('/salaries', salariesRouter); // For manipulating the salary array inside employee model
app.use('/entries', entriesRouter); // For manipulating the entries array inside ledger model

module.exports = app;