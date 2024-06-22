const express = require('express');
const { GetUsers, AddUser, UpdateEmail, RevokeUserAccess, LoginUser, GrantUserAccess, SendEmailVerificationLink, VerifyEmail, ForgetPassword, ResetPassword } = require('./user.controller');
const auth = require('../../middlewares/auth.middleware');
const checkUserRole = require('../../middlewares/roles.middleware');

const userRouter = express.Router();

userRouter.post('/login', LoginUser);
userRouter.get('/get', auth, checkUserRole, GetUsers);
userRouter.post('/add', auth, checkUserRole, AddUser);
userRouter.get('/send/verification_link', SendEmailVerificationLink);
userRouter.get('/forget/password', ForgetPassword);
userRouter.patch('/verify/email', auth, VerifyEmail);
userRouter.patch('/update/email', auth, checkUserRole, UpdateEmail);
userRouter.patch('/reset/password', ResetPassword);
userRouter.patch('/access/revoke', auth, checkUserRole, RevokeUserAccess);
userRouter.patch('/access/grant', auth, checkUserRole, GrantUserAccess);

module.exports = userRouter;