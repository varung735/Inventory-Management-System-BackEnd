const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    purchase_name: {
        type: String,
        require: [true, "purchase_name is required"]
    },
    type: {
        type: String,
        require: [true, "purchase type is required"]
    },
    amount: {
        type: Number,
        require: [true, "amount is required"]
    },
    quantity: {
        type: Number,
        require: [true, "quantity is required"]
    },
    unit: {
        type: String, 
        require: [true, "unit is required"]
    },
    purchased_from: {
        type: String,
        require: [true, "purchased from is required"]
    },
    added_by: {
        type: String,
        require: [true, "added_by: emp_name is required"]
    }
});

module.exports = mongoose.model('purchases', purchaseSchema);