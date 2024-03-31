const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema(
    {
        item_name: {
            type: String,
            required: [true, 'Stock Item name is required']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required']
        },
        cost_price: {
            type: Number,
            required: [true, 'cost-price is required']
        },
        selling_price: {
            type: Number,
            required: [true, 'selling-price is required']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Stock', stockSchema);