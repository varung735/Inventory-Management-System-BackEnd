const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../../utils/userRoles');
const jwt = require('jsonwebtoken');
const config = require('../../config/enviornment.config');
const userAccess = require('../../utils/userAccess');
const generateRandomChars = require('../../services/generateRandomChars');
const generateRandomDigits = require('../../services/generateRandomDigits');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"]
        },
        username: {
            type: String,
            required: [true, "Username is Required"],
            unique: [true, "User already exists"]
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
            unique: [true, "Email already exists"]
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(roles),
            default: roles.employee
        },
        access: {
            type: String,
            enum: Object.values(userAccess),
            default: userAccess.granted
        },
        forgetPasswordToken: String,
        forgetPasswordExpiry: Date,
        forgetPasswordOtp: Number,
        verifyEmailToken: String,
        verifyEmailExpiry: Date,
        verifyEmailOtp: Number
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods = {
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    generateJwtToken: async function() {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                role: this.role,
                access: this.access,
                isEmailVerified: this.isEmailVerified
            },
            config.jwt_secret,
            {
                expiresIn: config.jwt_expiry
            }
        )
    },
    generateForgetPassToken: function() {
        const forgetPassToken = generateRandomChars(20);

        this.forgetPasswordToken = forgetPassToken;
        this.forgetPasswordExpiry = Date.now() + 5 * 60 * 1000;

        return forgetPassToken;
    },
    generateVerifyEmailToken: function() {
        const token = generateRandomChars(20);

        this.verifyEmailToken = token;
        this.verifyEmailExpiry = Date.now() + 5 *60 * 1000;

        return token;
    },
    generateVerifyEmailOtp: function() {
        const verifyEmailOtp = generateRandomDigits(6);

        this.verifyEmailOtp = verifyEmailOtp;

        return verifyEmailOtp;
    },
    generateForgetPassOtp: function() {
        const forgetPassOtp = generateRandomDigits(6);

        this.forgetPasswordOtp = forgetPassOtp;

        return forgetPassOtp;
    }
}

module.exports = mongoose.model('User', userSchema);