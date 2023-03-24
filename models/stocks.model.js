const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
    stock_name: {
        type: String,
        required: [true, "stock_name is required."]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    cost: {
        type: Number,
        required: [true, "cost is required"]
    },
    available: {
        type: Number,
        required: [true, "available is required."]
    },
    unit: {
        type: String,
        required: [true, "unit is required"]
    },
    date: {
        type: Date,
        required: [true, "date is required"],
        default: Date.now
    },
    added_by: {
        type: String,
        required: [true, "added_by:emp_name is required."]
    }
});

module.exports = mongoose.model('stocks', stocksSchema);