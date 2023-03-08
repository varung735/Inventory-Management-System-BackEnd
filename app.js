require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const {connectToDB} = require('./config/database');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

module.exports = app;