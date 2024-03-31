const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('../../utils/userRoles');
const jwt = require('jsonwebtoken');
const config = require('../../config/enviornment.config');
const userStatus = require('../../utils/userStatus');

const userSchema = new mongoose.Schema(
    {
        profilePicUrl: {
            type: String,
            default: 'some-url'
        },
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
        status: {
            type: String,
            enum: Object.values(userStatus),
            default: userStatus.active
        },
        forgetPasswordToken: String,
        forgetPasswordExpiry: Date,
        verifyEmailToken: String,
        verifyEmailExpiry: Date
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
    comaparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    },
    generateJwtToken: async function() {
        return jwt.sign(
            {
                _id: this._id,
                email: this.email,
                role: this.role,
                status: this.status
            },
            config.jwt_secret,
            {
                expiresIn: config.jwt_expiry
            }
        )
    },
    
}

module.exports = mongoose.model('User', userSchema);