const mongoose = require('mongoose');

const stocksSchema = new mongoose.Schema({
    stock_name: {
        type: String,
        require: [true, "stock_name is required."]
    },
    category: {
        type: String,
        require: [true, "category is required"]
    },
    cost: {
        type: Number,
        require: [true, "cost is required"]
    },
    available: {
        type: Number,
        require: [true, "available is required."]
    },
    date: {
        type: Date,
        require: [true, "date is required"],
        default: Date.now
    },
    added_by: {
        type: String,
        require: [true, "added_by:emp_name is required."]
    }
});

exports.model = mongoose.model('stocks', stocksSchema);