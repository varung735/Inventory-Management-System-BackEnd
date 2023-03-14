const salesModel = require('../models/sales.model');

//To get all the sales
exports.getSales = async (req, res) => {
    try {
        const sales = await salesModel.find();

        res.status(200).json({
            "success": true,
            "message": "Got All Sales Successfully",
            "sales": sales
        });
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot get Sales",
            "error": error.message
        });
        console.log(error);
    }
}

//To add the sales into the DB
exports.addSales = async (req, res) => {
    try {
        let { product_name, type, selling_price, sold_at, units_sold, unit, date, added_by } = req.body;

        // if any of the fields are missing
        if (!(product_name && type && selling_price && sold_at && units_sold && unit && date && added_by)) {
            res.status(401).send("All Fields are required.");
        }
        else{
            //sending a create entry to DB
            const addedSale = await salesModel.create({
                product_name,
                type,
                selling_price,
                sold_at,
                units_sold,
                unit,
                date,
                added_by
            });

            //response
            res.status(200).json({
                "success": true,
                "message": "Added Sale Successfully",
                "Sale": addedSale
            });
        }


    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Add Successfully",
            "error": error.message
        });
        console.log(error);
    }
}

//to update the sales
exports.updateSales = async (req, res) => {
    try {
        let id = req.params.id;

        //if sales entry doesn't exists
        const sale = await salesModel.find({id: id});
        if (!sale) {
            res.staus(400).json("Sale entry doesn't exists.");
        }
        else{
            //updating the entry in DB
            const updatedSale = await salesModel.findByIdAndUpdate(id, req.body);
    
            res.status(200).json({
                "success": true,
                "message": "updated sale successfully",
                "Updated sale": updatedSale
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Sale",
            "error": error.message
        });
        console.log(error);
    }
}

//to delete sale from DB
exports.deleteSales = async (req, res) => {
    try {
        let id = req.params.id;

        //checks if sales exists or not
        const sale = await salesModel.find({id: id});
        if(!sale){
            res.status(400).send("Sale Doesn't exists");
        }
        else{
            //deleting the sale from DB
            const deletedSale = await salesModel.findOneAndDelete(id);
    
            res.status(200).json({
                "success": true,
                "message": "Deleted Sales Successfully",
                "deleted sale": deletedSale
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Delete Sale",
            "error": error.message
        });
        console.log(error);
    }
}