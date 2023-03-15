const ledgersModel = require('../models/ledgers.model');

//to get all the ledgers from DB
exports.getLedgers = async (req, res) => {
    try {
        const ledgers = await ledgersModel.find();

        res.status(200).json({
            "success": true,
            "message": "Got All Ledgers Successfully",
            "ledgers": ledgers
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Get Ledgers",
            "error": error.message
        });
        console.log(error);
    }
}

//to add the ledger in DB
exports.addLedgers = async (req, res) => {
    try {
        let { account_of, entries } = req.body;

        //if any of the fields are missing
        if(!( account_of && entries )){
            res.status(400).send("All Fields are required");
        }
        else{
            //to add ledger to DB
            const addedLedger = await ledgersModel.create({
                account_of,
                entries
            });

            res.status(200).json({
                "success": true,
                "message": "added ledger successfully",
                "added_ledger": addedLedger
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Add Ledger",
            "error": error.message
        });
        console.log(error);
    }
}

//to update the ledger in DB
exports.updateLedgers = async (req, res) => {
    try {
        let id = req.params.id;

        //if ledger exists or not
        const ledger = await ledgersModel.find({_id: id});
        if(!ledger){
            res.status(400).send("Ledger doesn't exists");
        }   
        else{
            //updating ledger in DB
            const updatedLedger = await ledgersModel.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json({
                "success": true,
                "message": "Updated Ledger Successfully",
                "updated_ledger": updatedLedger
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Ledger",
            "error": error.message
        });
        console.log(error);
    }
}

//to delete the ledger in DB
exports.deleteLedgers = async (req, res) => {
    try {
        let id = req.params.id;

        //if ledger exists or not
        const ledger = await ledgersModel.find({ _id: id });
        if(!ledger){
            res.status(400).send("Ledger doesn't exists");
        }   
        else{
            //deleting ledger in DB
            const deletedLedger = await ledgersModel.findByIdAndDelete(id, req.body, {new: true});

            res.status(200).json({
                "success": true,
                "message": "Deleted Ledger Successfully",
                "deleted_ledger": deletedLedger
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Delete Ledger",
            "error": error.message
        });
        console.log(error);
    }
}