const config = require('../config/enviornment.config');

const cookieOptions = {
    expires: new Date(),
    httpOnly: config.env === 'PROD',
    secure: config.env === 'PROD',
    sameSite: 'lax'
}

module.exports = cookieOptions;