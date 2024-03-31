require('dotenv').config();
const {connectToDB} = require('./src/config/database.config');
const config = require('./src/config/enviornment.config');
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const REQ_URL = config.env === 'PROD' ? config.prod_url : config.local_url;

const indexRouter = require('./src/index');

const corsOptions = {
    credentials: true,
    origin: REQ_URL
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.set("trust proxy", 1);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', REQ_URL);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie');
//     next();
// });

connectToDB();

app.use('/api', indexRouter);

module.exports = app;