const mongoose = require('mongoose');

const ledgersSchema = new mongoose.Schema({
    account_of: {
        type: String,
        require: [true, "account_of is required"]
    },
    entries: [{
        date: {
            type: Date,
            require: [true, "date is required"],
            default: Date.now
        },
        description: {
            type: String
        },
        debit: {
            type: Number
        },
        credit: {
            type: Number
        },
        balance: {
            type: Number
        }
    }]
});

exports.model = mongoose.model('ledgers', ledgersSchema);