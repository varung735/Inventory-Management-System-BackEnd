const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    purchase_name: {
        type: String,
        required: [true, "purchase_name is required"]
    },
    type: {
        type: String,
        required: [true, "purchase type is required"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"]
    },
    unit: {
        type: String, 
        required: [true, "unit is required"]
    },
    purchased_from: {
        type: String,
        required: [true, "purchased from is required"]
    },
    date: {
        type: Date,
        required: [true, "date is required"],
        default: Date.now
    },
    added_by: {
        type: String,
        required: [true, "added_by: emp_name is required"]
    }
});

module.exports = mongoose.model('purchases', purchaseSchema);