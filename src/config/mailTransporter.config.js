const nodemailer = require('nodemailer');
const config = require('./enviornment.config');

const transport = nodemailer.createTransport({
    host: config.stmp_host,
    port: config.smtp_port,
    secure: config.smtp_secure,
    auth: {
        user: config.stmp_username,
        pass: config.smtp_pass
    }
});

module.exports = transport;