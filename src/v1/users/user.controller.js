const userModel = require('./user.model');
const asyncHandler = require('../../utils/asyncHandler');
const CustomError = require('../../utils/customError');
const cookieOptions = require('../../utils/cookieOptions');
const userStatus = require('../../utils/userStatus');

/*
@LoginUser

@method: POST

@routes
local - http://localhost:4000/api/v1/users/login
prod - https://ims-backend.render.app/api/v1/users/login

**description
step 1 - Destructure email and password from req.body
step 2 - check if any of the field is missing
step 3 - throw error if any of the field's missing
step 4 - check if email exists in database
step 5 - throw error if user doesn't exists
step 6 - check if user status is active or not
step 7 - deny access if the status is revoked
step 8 - encrypt the password provided in req.body
step 9 - compare the encrypted password with the one in database
step 10 - send the user document and token as response

@parameters - email , password

@returns - user object
*/
exports.LoginUser = asyncHandler(async (req, res) => {
    const { username_or_email, password } = req.body;

    if(!email || !password){
        throw new CustomError('One of the fields is missing');
    }

    const user = userModel.findOne({ $or: [
        { username: username_or_email },
        { email: username_or_email }
    ] }, '+password');

    if(user === null){
        throw new CustomError('User Not Found', 404);
    }

    if(user.status === userStatus.revoked){
        throw new CustomError('You access has been revoked', 403);
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(isPasswordMatch){
        const token = user.generateJwtToken();
        user.password = undefined;

        res.clearCookie('token');
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User Logged In Successfully',
            user
        });
    }
    else{
        throw new CustomError('Invalid Credentials', 403);
    }
});

/*
@GetUsers

@method - GET

@routes
local - http://localhost:4000/api/v1/users/get
prod - https://ims-backend.render.app/api/v1/users/get

**description
step 1 - use find() query to fetch all the users collection in the DB
step 2 - send the received users object array through the response 

@parameters - none

@returns - users object array
*/
exports.GetUsers = asyncHandler(async (req, res) => {
    const users = await userModel.find();

    res.status(200).json({
        success: true,
        message: "Got All Users Successfully",
        users
    });
});

/*
@AddUser

@method: POST

@routes
local - http://localhost:4000/api/v1/users/add
prod - https://ims-backend.render.app/api/v1/users/add

**description
step 1 - Destructure the values received from req.body
step 2 - check if any of the fields missing
step 3 - return error if any of the field's missing
step 4 - Encrypt the provided Password
step 5 - use create query to create the new user document in users collection
step 6 - send the newly created user as response

@parameters - name, email, password, role

@returns - User object
*/
exports.AddUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password || !role){
        throw new CustomError("One of the fields Missing", 404);
    }

    const user = await userModel.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({
        success: true,
        message: "Created User Successfully",
        user
    });
});

/*
@UpdateEmail

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/update/email
prod - https://ims-backend.render.app/api/v1/users/update/email

**description
step 1 - Destructure the values received from req.body
step 2 - check if any of fields is missing
step 3 - throw error if any of the field's missing
step 4 - using findByIdAndUpdate method to query the DB for updating the required document
step 5 - send the updated document as response

@parameters - email

@returns - 
*/
exports.UpdateEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { _id } = req.user;

    const user = await userModel.findById(_id);

    if(user === null){
        throw new CustomError('User not Found', 404);
    }

    
});

/*
@UpdatePassword

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/update/password
prod - https://ims-backend.render.app/api/v1/users/update/password

**description

@parameters - password

@returns - 
*/
exports.UpdatePassword = asyncHandler(async (req, res) => {

});

/*
@DeactivateUser

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/deactivate
prod - https://ims-backend.render.app/api/v1/users/deactivate

**description
step 1 - Destructure userId from req.body
step 2 - check if the userId is missing
step 3 - throw error if the userId is missing
step 4 - using findByIdAndUpdate method to update the required document in database
step 5 - send success/failure response
*/
exports.DeactivateUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId){
        throw new CustomError('UserId not Found', 404);
    }

    const user = userModel.findByIdAndUpdate(userId, {
        active : false
    }, { new: true });

    res.status(200).json({
        success: true,
        message: 'User Deactivated Successfully'
    });
});