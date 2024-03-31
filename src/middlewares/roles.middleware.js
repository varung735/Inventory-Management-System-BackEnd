const config = require('../config/enviornment.config');
const asyncHandler = require('../utils/asyncHandler');
const CustomError = require('../utils/customError');
const userRoles = require('../utils/userRoles');

const checkUserRole = asyncHandler(async (req, res, next) => {
    const role = req.user.role;

    if(role !== userRoles.admin || role !== userRoles.sub_admin){
        throw new CustomError('Not Authorized', 403);
    }
    else{
        next();
    }
});

module.exports = checkUserRole;