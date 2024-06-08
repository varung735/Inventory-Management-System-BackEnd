const config = {
    port: process.env.PORT,
    env: process.env.ENV,
    mongo_url: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET_KEY,
    jwt_expiry: process.env.JWT_EXPIRY,
    local_url: process.env.REQ_URL_LOCAL,
    prod_url: process.env.REQ_URL_PROD,
    smtp_email: process.env.SMTP_EMAIL_ADDRESS,
    smtp_pass: process.env.SMTP_EMAIL_PASSWORD,
    stmp_username: process.env.SMTP_USERNAME,
    stmp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_secure: process.env.SMTP_IS_SECURE
};

module.exports = config;