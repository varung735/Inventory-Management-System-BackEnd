const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema(
    {
        cust_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        generated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        items: [{
            stock_item_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Stock'
            },
            quantity: Number
        }],
        amount: Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Bill', BillSchema);