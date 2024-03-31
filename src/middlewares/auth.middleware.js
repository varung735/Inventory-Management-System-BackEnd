const jwt = require('jsonwebtoken');
const config = require('../config/enviornment.config');
const CustomError = require('../utils/customError');
const errorMessages = require('../utils/errorMessages');
const asyncHandler = require('../utils/asyncHandler');

const auth = asyncHandler(async (req, res, next) => {
    let token;

    if(req.cookies.token || req.headers.authorization.startsWith('Bearer')){
        token = req.cookies.token || req.headers.authorization.split(' ')[1];
    }

    if(!token){
        throw new CustomError('Token not Found', 404);
    }

    try {
        const decodedToken = jwt.verify(token, config.jwt_secret);
        req.user = decodedToken;

        next();
    } catch (error) {
        console.log(errorMessages.error(error.message));
        throw new CustomError('Token Malformed', 403);
    }
});

module.exports = auth