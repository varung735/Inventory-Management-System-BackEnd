const jwt = require('jsonwebtoken');
const config = require('../config/enviornment.config');
const CustomError = require('../utils/customError');
const errorMessages = require('../utils/errorMessages');
const asyncHandler = require('../utils/asyncHandler');
const userAccess = require('../utils/userAccess');

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

        if(req.user.access === userAccess.revoked){
            throw new CustomError('Your access has been revoked', 403);
        }

        next();
    } catch (error) {
        console.log(errorMessages.error(error.message));
        throw new CustomError('Token Malformed', 403);
    }
});

module.exports = auth