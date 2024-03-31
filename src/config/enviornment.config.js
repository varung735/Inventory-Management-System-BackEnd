const config = {
    port: process.env.PORT,
    env: process.env.ENV,
    mongo_url: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET_KEY,
    jwt_expiry: process.env.JWT_EXPIRY,
    local_url: process.env.REQ_URL_LOCAL,
    prod_url: process.env.REQ_URL_PROD
};

module.exports = config;