const mongoose = require('mongoose');

const inventoriesSchema = new mongoose.Schema({
    item_name: {
        type: String,
        require: [true, "item name is required."]
    },
    type: {
        type: String,
        require: [true, "type is required."]
    },
    quantity: {
        type: String,
        require: [true, "quantity is requried."]
    },
    unit: {
        type: String,
        require: [true, "unit is required"]
    },
    date: {
        type: Date,
        require: [true, "date is requried."]
    },
    added_by: {
        type: String,
        required: [true, "added_by : emp_name is required"]
    }
});

module.exports = mongoose.model('inventories', inventoriesSchema);