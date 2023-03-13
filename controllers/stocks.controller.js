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
        if(!(stock_name && category && cost && available && date && added_by)){
            res.status(400).send("All Fields are neccessary");
        }

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
        
    } catch (error) {
        console.log(error);
    }
}

//to delete stocks from DB
exports.deleteStocks = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}