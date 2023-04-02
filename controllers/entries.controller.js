const ledgerModel = require('../models/ledgers.model');

//Function to add an element to entries
exports.addEntry = async (req, res) => {
    try {
        const { account_id, description, debit, credit, balance } = req.body;

        const entry = await ledgerModel.updateOne({ "_id": account_id },
        { $push: { "entries": { description: description, debit: debit, credit: credit, balance: balance } } });

        if(!entry){
            res.status(400).send("Ledger Account Doesn't Exists.");
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Entry Added Successfully"
            });
        }
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Add Entry",
            "error": error.message
        });
        console.log(error);
    }
}

// Function to update the entries (which is a nested array inside ledger object) element
exports.updateEntry = async (req, res) => {
    try {
        const { account_id, entry_id, description, debit, credit, balance } = req.body;

        const entry = await ledgerModel.updateOne({ "_id": account_id, "entries._id": entry_id }, 
        { $set: { "entries.$.description": description, "entries.$.debit": debit, "entries.$.credit": credit, "entries.$.balance": balance } },
        {arrayFilters: [{"entries._id": entry_id}] });

        if(!entry){
            res.status(400).send("Ledger Account Doesn't Exists.");
        }
        else{
            const entry = await ledgerModel.find({ "_id": account_id, "entries._id": entry_id });
            res.status(200).json({
                "success": true,
                "message": "Entry Updated Successfully",
                "updated_entry": entry
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Entry",
            "error": error.message
        });
        console.log(error);
    }
}

//Function to delete the selected element from entries (which is a nested array inside ledger object)
exports.deleteEntry = async (req, res) => {
    try {
        const { account_id, entry_id } = req.body;

        const entry = await ledgerModel.updateOne({ "_id": account_id, "entries._id": entry_id }, 
        { $pull: { "entries": { "_id": entry_id } } });
        
        if(!entry){
            res.status(400).send("Account Doesn't Exists");
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Deleted Entry Successfully"
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Delete Entry",
            "error": error.message
        })
        console.log(error);
    }
}