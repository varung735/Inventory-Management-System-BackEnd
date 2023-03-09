require('dotenv').config();
const {connectToDB} = require('./config/database');
const express = require('express');
const cors = require('cors');
const app = express();

const employeesRouter = require('./routers/employees.router');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use('/employees', employeesRouter);

module.exports = app;