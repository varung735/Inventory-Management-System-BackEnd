const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        ex_name: {
            type: String,
            required: [true, 'Expense name is required']
        },
        ex_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense_Type'
        },
        amount: {
            type: Number,
            required: [true, 'Expense Amount is required']
        },
        date: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Expense', expenseSchema);