require('dotenv').config();
const {connectToDB} = require('./config/database');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const employeesRouter = require('./routes/employees.routes');
const inventoriesRouter = require('./routes/inventories.routes');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

app.use('/employees', employeesRouter);
app.use('/inventories', inventoriesRouter);

module.exports = app;