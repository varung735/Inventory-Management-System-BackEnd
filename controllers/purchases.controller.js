const purchasesModel = require('../models/purchases.model');

//to get all the purchases successfully
exports.getPurchases = async (req, res) => {
    try {
        const purchases = await purchasesModel.find();

        res.status(200).json({
            "success": true,
            "message": "got all purchases successfully",
            "purchases": purchases
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "cannnot get purchases",
            "error": error.message
        });
        console.log(error);
    }
}

//to add a purchase to DB
exports.addPurchases = async (req, res) => {
    try {
        let { purchase_name, type, amount, quantity, unit, purchased_from, date, added_by } = req.body;

        //if any of the fields are missing
        if (!(purchase_name && type && amount && quantity && unit && purchased_from && date && added_by)) {
            res.status(400).send("All Fields are required");
        }

        const addedPurchase = await purchasesModel.create({
            purchase_name,
            type, 
            amount,
            quantity,
            unit,
            purchased_from,
            date,
            added_by
        });

        res.status(200).json({
            "success": true,
            "message": "Added Purchase Successfully",
            "Added Purchase": addedPurchase
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Add Purchase",
            "error": error.message
        });
        console.log(error);
    }
}

//to update the purchase in DB
exports.updatePurchases = async (req, res) => {

}

//to delete the purchase in DB
exports.deletePurchases = async (req, res) => {

}