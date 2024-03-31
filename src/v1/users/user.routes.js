const express = require('express');
const { GetUsers, AddUser, UpdateEmail, UpdatePassword, DeactivateUser, LoginUser } = require('./user.controller');
const auth = require('../../middlewares/auth.middleware');
const checkUserRole = require('../../middlewares/roles.middleware');

const userRouter = express.Router();

userRouter.post('/login', auth, LoginUser);
userRouter.get('/get', auth, checkUserRole, GetUsers);
userRouter.post('/add', auth, checkUserRole, AddUser);
userRouter.patch('/update/email', auth, UpdateEmail);
userRouter.patch('/update/password', auth, UpdatePassword);
userRouter.patch('/deactivate', auth, checkUserRole, DeactivateUser);

module.exports = userRouter;