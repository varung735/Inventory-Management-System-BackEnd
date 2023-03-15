const stocksModel = require('../models/stocks.model');

//to get all the stocks from DB
exports.getStocks = async (req, res) => {
    try {
        const stocks = await stocksModel.find();

        res.status(200).json({
            "success": true,
            "message": "Got all stocks successfully",
            "stocks": stocks
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot get stocks",
            "error": error.message
        });
        console.log(error);
    }
}

//to add stock to DB
exports.addStocks = async (req, res) => {
    try {
        let { stock_name, category, cost, available, date, added_by } = req.body;

        //check if any of the fields missing
        if (!(stock_name && category && cost && available && date && added_by)) {
            res.status(400).send("All Fields are neccessary");
        }
        else {
            //adding stock to DB
            const addedStock = await stocksModel.create({
                stock_name,
                category,
                cost,
                available,
                date,
                added_by
            });

            res.status(200).json({
                "success": true,
                "message": "Added Stock Successfully",
                "added_stock": addedStock
            });
        }
        
    } catch (error) {
        res.status().json({
            "success": false,
            "message": "Cannot Add Stock",
            "error": error.message
        });
        console.log(error);
    }
}

//to update the stocks in DB
exports.updateStocks = async (req, res) => {
    try {
        let id = req.params.id;

        //if stock exists or not
        const stock = await stocksModel.find({ _id: id });
        if (!stock) {
            res.status(400).send("Stock Doesn't exists");
        } 
        else {
            //updating stock in DB
            const updatedStock = await stocksModel.findByIdAndUpdate(id, req.body, { new: true });

            res.status(200).json({
                "success": true,
                "message": "Updated Stock Sucessfully",
                "updated_stock": updatedStock
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Stock",
            "error": error.message
        });
        console.log(error);
    }
}

//to delete stocks from DB
exports.deleteStocks = async (req, res) => {
    try {
        try {
            let id = req.params.id;

            //if stock exists or not
            const stock = await stocksModel.find({ _id: id });
            if (!stock) {
                res.status(400).send("Stock Doesn't exists");
            } 
            else{
                //deleting stock in DB
                const deletedStock = await stocksModel.findByIdAndDelete(id);
    
                res.status(200).json({
                    "success": true,
                    "message": "Deleted Stock Sucessfully",
                    "deleted_stock": deletedStock
                });
            }

        } catch (error) {
            res.status(400).json({
                "success": false,
                "message": "Cannot Delete Stock",
                "error": error.message
            });
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
}