const inventoriesModel = require('../models/inventories.model');
const inventoryModel = require('../models/inventories.model');

// to get all the inventories
exports.getInventories = async (req, res) => {
    try {
        const inventories = await inventoryModel.find();

        res.status(200).json({
            "success": true,
            "message": "got inventories successfully",
            "inventories": inventories
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot get inventories",
            "error": error.message
        });
        console.log(error);
    }
}

//to add an inventory entry to DB
exports.addInventories = async (req, res) => {
    try {
        let { item_name, type, quantity, unit, added_by } = req.body;

        //if any of the fields is missing
        if (!(item_name && type && quantity && unit && added_by)) {
            res.status(401).send("All fields are required");
        }

        //creating an entry in DB
        const newInventory = await inventoryModel.create({
            item_name,
            type,
            quantity,
            unit,
            added_by
        });

        res.status(200).json({
            "success": true,
            "message": "Inventory Created Successfully",
            "Inventory": newInventory
        });

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot create inventory",
            "error": error.message
        });
        console.log(error)
    }
}

//to update an inventory in DB
exports.updateInventories = async (req, res) => {
    try {
        let id = req.params.id;

        //if inventory doesn't exists
        const isExisting = await inventoriesModel.find({ id: id });
        if (!isExisting) {
            res.status(400).send("Inventory item doesn't exists");
        }

        //updating the collection in DB
        const updatedInventory = await inventoriesModel.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json({
            "success": true,
            "message": "updated inventory successfully",
            "inventory": updatedInventory
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot update inventory",
            "error": error.message
        });
        console.log(error);
    }
}

// to delete an inventory item in DB
exports.deleteInventories = async (req, res) => {
    try {
        let id = req.params.id;

        //if user doesn't exists
        const isExisting = await inventoriesModel.findOne({ _id: id });
        if (!isExisting) {
            res.status(401).send("Employee doesn't exists");
        }
        
        const deletedInventory = await inventoriesModel.findByIdAndDelete(id);

        res.status(200).json({
            "success": true,
            "message": "Inventory deleted successfully",
            "inventory": deletedInventory
        });
    } catch (error) {
        console.log(error);
    }
}

