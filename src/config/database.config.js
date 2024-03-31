const mongoose = require('mongoose');
const errorMessages = require('../utils/errorMessages');
const config = require('./enviornment.config');


exports.connectToDB = () => {
    mongoose.connect(config.mongo_url, {
        useUnifiedTopology : true,
        useNewUrlParser: true
    })
    .then((dbHost) => {console.log(errorMessages.success(`Connected to DB: ${dbHost.connection.host}`))})
    .catch((error) => {
        console.log(errorMessages.error("Cannot connect to DB."));
        console.log(errorMessages.error(error.message));
        process.exit(1);
    });
}