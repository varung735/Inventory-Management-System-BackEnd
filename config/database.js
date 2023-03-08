const mongoose = require('mongoose');
MONGO_URI = process.env.MONGO_URI;

exports.connectToDB = () => {
    mongoose.connect(MONGO_URI, {
        useUnifiedTopology : true,
        useNewUrlParser: true
    })
    .then((dbHost) => {console.log(`Connected to DB: ${dbHost.connection.host}`)})
    .catch((error) => {
        console.log("Cannot connect to DB.");
        console.log(error.message);
        process.exit(1);
    });
}