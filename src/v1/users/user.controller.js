const userModel = require('./user.model');
const asyncHandler = require('../../utils/asyncHandler');
const CustomError = require('../../utils/customError');
const cookieOptions = require('../../utils/cookieOptions');
const userAccess = require('../../utils/userAccess');
const sendMail = require('../../services/sendEmail');
const errorMessages = require('../../utils/errorMessages');
const config = require('../../config/enviornment.config');
const { success } = require('../../utils/consoleFonts');
const consoleFont = require('../../utils/consoleFonts');

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

    if(!username_or_email || !password){
        throw new CustomError('One of the fields is missing');
    }

    const user = await userModel.findOne({ $or: [
        { username: username_or_email },
        { email: username_or_email }
    ] }, '+password');

    if(user === null){
        throw new CustomError('User Not Found', 404);
    }

    if(user.access === userAccess.revoked){
        throw new CustomError('You access has been revoked', 403);
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(isPasswordMatch){
        const token = await user.generateJwtToken();
        user.password = undefined;

        res.clearCookie('token');
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'User Logged In Successfully',
            token,
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
    const { name, email, username, password, role } = req.body;

    if(!name || !email || !username || !password || !role){
        throw new CustomError("One of the fields Missing", 404);
    }

    const user = await userModel.create({
        name,
        email,
        username,
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
@SendEmailVerificationLink

@method: GET

@routes
local - http://localhost:4000/api/v1/users/send/verification_link?email=email
prod - https://ims-backend.render.app/api/v1/users/send/verification_link?email=email

**description
step 1 - Desstructure the email from req.body
step 2 - check if the email is missing, if missing throw error
step 3 - check if user exists with that email, throw error if doesn't exists
step 4 - send email verification token and otp to the provided email through sendMail function
step 5 - send success/failure message

@parameters - email

@returns - success/failure response
*/
exports.SendEmailVerificationLink = asyncHandler(async (req, res) => {
    const { email } = req.query;

    if(!email){
        throw new CustomError('Email is missing', 404);
    }

    const user = await userModel.findOne({ email });
    
    if(user === null){
        throw new CustomError('User not Found', 404);
    }
    
    const token = user.generateVerifyEmailToken();
    const otp = user.generateVerifyEmailOtp();

    await user.save();
    
    const link = `${config.env === 'PROD' ? config.prod_url : config.local_url}/api/v1/users/verify/email?token=${token}`;
    const text = `Click on this link ${link} \n and \nEnter This Otp to verify your email: ${otp}`;
    
    try {
        await sendMail({
            email: email,
            subject: 'Verify Your Email - IMS System',
            text
        });
        
        res.status(200).json({
            success: true,
            message: 'Mail Sent Successfully'
        })
    } catch (error) { 
        user.verifyEmailToken = undefined;
        user.verifyEmailExpiry = undefined;
        user.verifyEmailOtp = undefined;

        await user.save({ validateBeforeSave: false });

        console.log(errorMessages.error(error.message));
        throw new CustomError('Cannot send email', 500);
    }
});

/*
@VerifyEmail

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/verify/email?token=token
prod - https://ims-backend.render.app/api/v1/users/verify/email?token=token

**description
step 1 - destructure token and otp from req.query
step 2 - check if token or otp is missing, if missing then throw error
step 3 - find the user through the token, if user is not found, throw error
step 4 - compare the otps, throw error if otps doesn't match
step 5 - turn isEmailVerified value to true, if otps match
step 6 - send success/faliure message to user

@parameters - token, otp

@returns - success/failure message
*/
exports.VerifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const { otp } = req.body;

    console.log(token);

    if(!token || !otp){
        throw new CustomError('token or otp is missing', 404);
    }

    const user = await userModel.findOne({
        verifyEmailToken: token,
        verifyEmailExpiry: { $gt: Date.now() }
    });

    if(user === null){
        throw new CustomError('Token invalid or expired', 403);
    }

    if(user.verifyEmailOtp !== otp){
        throw new CustomError('Otp Invalid', 403);
    }

    user.verifyEmailToken = undefined;
    user.verifyEmailExpiry = undefined;
    user.verifyEmailOtp = undefined;

    user.isEmailVerified = true;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Email Verified Successfully'
    })
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
    const { username, email } = req.body;

    const user = await userModel.findOne({ username: username });

    if(user === null){
        throw new CustomError('User not Found', 404);
    }

    user.email = email;
    user.isEmailVerified = false;

    res.status(200).json({
        success: true,
        message: 'User Email Changed Successfully'
    });
});

/*
@ForgetPassword

@method: GET

@routes
local - http://localhost:4000/api/v1/users/forget/password
prod - https://ims-backend.render.app/api/v1/users/forget/password

**description
step 1 - Take the email from req.body
step 2 - Find the user in the database through email
step 3 - send error if user not found
step 4 - generate token for the user, if found
step 5 - save the token in the user's document
step 6 - Send the link to the user's email
step 7 - Send Success/Failure Response

@parameters - email

@returns - success/failure message
*/
exports.ForgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;

    const user = await userModel.findOne({ email: email });

    if(user === null){
        throw new CustomError('User not Found', 404);
    }

    const token = user.generateForgetPassToken();

    await user.save();

    const link = `${config.env === 'PROD' ? config.prod_url : config.local_url}/api/v1/users/reset/password?token=${token}`;
    const text = `Click on this link ${link} to change your password`;

    try {
        await sendMail({
            email: email,
            subject: 'Reset Password Link',
            text
        });

        res.status(200).json({
            success: true,
            message: 'Password Reset Link Sent Successfully'
        });
    } catch (error) {
        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        console.log(consoleFont.error(error.message));
        throw new CustomError('Cannot Send Forget Password Link', 500);
    }
})

/*
@UpdatePassword

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/reset/password
prod - https://ims-backend.render.app/api/v1/users/reset/password

**description

@parameters - password

@returns - 
*/
exports.ResetPassword = asyncHandler(async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;

    if(!password) {
        throw new CustomError('Password is missing', 404);
    }

    if(!token) {
        throw new CustomError('Token is missing', 404);
    }

    const user = await userModel.findOne({
        forgetPasswordToken: token,
        forgetPasswordExpiry: { $gt: Date.now() }
    });

    if(user === null) {
        throw new CustomError('Token Invalid or Expired', 404);
    }

    user.password = password;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'password updated successfully'
    });
});

/*
@RevokeUserAccess

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/access/revoke
prod - https://ims-backend.render.app/api/v1/users/access/revoke

**description
step 1 - Destructure userId from req.body
step 2 - check if the userId is missing
step 3 - throw error if the userId is missing
step 4 - using findByIdAndUpdate method to update the required document in database
step 5 - send success/failure response
*/
exports.RevokeUserAccess = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId){
        throw new CustomError('UserId not Found', 404);
    }

    const user = await userModel.findByIdAndUpdate(userId, {
        access : userAccess.revoked
    }, { new: true });

    res.status(200).json({
        success: true,
        message: 'User Access Revoked Successfully'
    });
});

/*
@GrantUserAccess

@method: PATCH

@routes
local - http://localhost:4000/api/v1/users/access/grant
prod - https://ims-backend.render.app/api/v1/access/grant

**description
step 1 - Destructure userId from req.body
step 2 - check if the userId is missing
step 3 - throw error if the userId is missing
step 4 - using findByIdAndUpdate method to update the required document in database
step 5 - send success/failure response
*/
exports.GrantUserAccess = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if(!userId){
        throw new CustomError('UserId not Found', 404);
    }

    const user = await userModel.findByIdAndUpdate(userId, {
        access: userAccess.granted
    }, { new: true });

    res.status(200).json({
        success: true,
        message: 'User Access Granted Successfully'
    });
});