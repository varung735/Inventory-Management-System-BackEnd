const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    expense_name: {
        type: String,
        require: [true, "expense_name is required."]
    },
    type: {
        type: String,
        require: [true, "expense type is required"]
    },
    paid_to: {
        type: String,
        require: [true, "paid_to is required"]
    },
    amount: {
        type: Number,
        require: [true, "amount is required"]
    },
    added_by: {
        type: String,
        require: [true, "added_by:emp_name is required"]
    }
});

exports.model = mongoose.model('expenses', expensesSchema);