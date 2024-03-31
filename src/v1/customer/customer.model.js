const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        cust_name: {
            type: String,
            required: [true, 'Customer name is required']
        },
        contact_no: {
            type: Number,
            required: [true, 'contact no is required'],
            unique: [true, 'Contact no should be unique']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customer', customerSchema);