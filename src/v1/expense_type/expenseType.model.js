const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema(
    {
        ex_type_name: {
            type: String,
            required: [true, 'Expense Type Name is required']
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Expense_Type', expenseTypeSchema);