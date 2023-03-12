const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true, "product name is required"]
    },
    type: {
        type: String,
        required: [true, "type is required"]
    },
    selling_price: {
        type: Number,
        required: [true, "selling_price is required."]
    },
    sold_at: {
        type: Number,
        required: [true, "sold_at is required"]
    },
    units_sold: {
        type: Number,
        required: [true, "units_sold is required"]
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
        required: [true, "added_by:emp_name is required"]
    }
});

module.exports = mongoose.model('sales', salesSchema);