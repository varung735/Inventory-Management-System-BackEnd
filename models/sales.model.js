const mongoose = require('mongoose');

const salesSchema = new ongoose.Schema({
    product_name: {
        type: String,
        require: [true, "product name is required"]
    },
    type: {
        type: String,
        require: [true, "type is required"]
    },
    selling_price: {
        type: Number,
        require: [true, "selling_price is required."]
    },
    sold_at: {
        type: Number,
        require: [true, "sold_at is required"]
    },
    units_sold: {
        type: Number,
        require: [true, "units_sold is required"]
    },
    unit: {
        type: String,
        require: [true, "unit is required"]
    },
    date: {
        type: String,
        require: [true, "date is required"]
    },
    added_by: {
        type: String,
        require: [true, "added_by:emp_name is required"]
    }
});

exports.model = mongoose.model('sales', salesSchema);