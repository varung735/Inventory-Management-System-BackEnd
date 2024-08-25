const stockModel = require('./stock.model');
const asyncHandler = require('../../utils/asyncHandler');
const CustomError = require('../../utils/customError');
const { success } = require('../../utils/consoleFonts');

/*
@GetStocksByAlphabet

@method: GET

@routes
local - http://localhost:4000/api/v1/stocks/get_by_alphabet?alphabet=alphabet
prod - https://ims-backend.render.app/api/v1/stocks/get_by_alphabet?alphabet=alphabet

**description
step 1 - destructure the alphabet from req.query
step 2 - use regex for querying the database to get all the items starting with that alphabet
step 3 - send all the documents as response, or send error

@arguements - alphabet

@returns - stock document array
*/
exports.GetStocksByAlphabet = asyncHandler(async (req, res) => {
    const { alphabet } = req.query;

    if(!alphabet) {
        throw new CustomError('Alphabet not Found', 404);
    }

    const stocks = await stockModel.find({ item_name: { $regex: new RegExp(`^${alphabet}`, 'i') } });

    res.status(200).json({
        success: true,
        message: 'Got All Stocks Successfully',
        stocks
    });
});

/*
@SearchStock

@method: GET

@routes
local - http://localhost:4000/api/v1/stocks/search?term=term
prod - https://ims-backend.render.app/api/v1/stocks/search?term=term

**description
step 1 - destructure the search term from req.body
step 2 - use regex to search for that erm in DB
step 3 - return the response to user, success or failure

@arguements - searchTerm

@returns - stock object or empty array
*/
exports.SearchStock = asyncHandler(async (req, res) => {
    const { term } = req.query;

    if(!term) {
        throw new CustomError('Search Term Not Found', 404);
    }

    const stocks = await stockModel.find({ item_name: { $regex: new RegExp(term, 'i') } });

    if(stocks.length > 0){
        res.status(200).json({
            success: true,
            message: 'Stocks Found Successfully',
            stocks
        });
    }
    else{
        res.status(404).json({
            success: false,
            message: 'No Stock Found regarding this query'
        });
    }

});

/*
@AddStock

@method: POST

@routes
local - http://localhost:4000/api/v1/stocks/add
prod - https://ims-backend.render.app/api/v1/stocks/add

**description
step 1 - destructure item object from req.body
step 2 - check if any of the fields is empty
step 3 - if any of the fields is empty, throw error
step 4 - Use create query for adding the stock document to stock collection in DB
step 5 - send success response if the query is successful or send error, if not. 

@arguements - item_name, quantity, unit, cost_price, selling_price

@returns - success or failure message
*/
exports.AddStock = asyncHandler(async (req, res) => {
    const { item_name, quantity, unit, cost_price, selling_price } = req.body;

    if(!item_name || !quantity || !unit || !cost_price || !selling_price) {
        throw new CustomError('One of the fields is missing', 404);
    }

    const stock = await stockModel.findOne({ item_name: item_name });

    if(stock === null) {
        const stock = await stockModel.create({
            item_name,
            quantity,
            unit,
            cost_price,
            selling_price
        });

        res.status(200).json({
            success: true,
            message: 'Stock Item Added Successfully',
            stock
        });
    }
    else{
        res.status(409).json({
            success: false,
            message: 'Stock Item Already Exists'
        });
    }
});

/*
@GetStocks

@method: GET

@routes
local - http://localhost:4000/api/v1/stocks/get
prod - https://ims-backend.render.app/api/v1/stocks/get

**description
step 1 - Call the database directly for all the stock items
step 2 - send success response if the query is successful or send error, if not

@arguements - none

@returns - Object array
*/
exports.GetStocks = asyncHandler(async (req, res) => {
    const stocks = await stockModel.find().select('item_name quantity unit cost_price selling_price');

    res.status(200).json({
        success: true,
        message: "Got All Stocks Successfully",
        stocks
    });
})

/*
@RestockItem

@method: PATCH

@routes 
local - http://localhost:4000/api/v1/stocks/restock
prod - https://ims-backend.render.app/api/v1/stocks/restock

**description
step 1 - destructure stockId and quantity from req.body
step 2 - find the document which is to be updated in the document through stockId.
step 3 - update the quantity in that found document
step 4 - send updated document as response

@arguement - stockId, quantity

@return - updated stock item
*/
exports.RestockItem = asyncHandler(async (req, res) => {
    const { stockId, quantity } = req.body;

    if(!stockId || !quantity) {
        throw new CustomError('One of the fields is missing', 404);
    }

    const stock = await stockModel.findByIdAndUpdate(stockId, { quantity: quantity }, { new: true });

    res.status(200).json({
        success: true,
        message: 'Item Restocked Successfully',
        stock
    });
});

/*
@DeleteStock

@method: DELETE

@route
local - http://localhost:4000/api/v1/stocks/delete
prod - https://ims-backend.render.app/api/v1/stocks/delete

**description
step 1 - destructure stockId from req.body
step 2 - use findByIdAndDelete query to delete the document associated with stockId
step 3 - send response, success or failure

@arguements - stockId

@returns - success or failure response
*/
exports.DeleteStock = asyncHandler(async (req, res) => {
    const { stockId } = req.body;

    const stock = await stockModel.findByIdAndDelete(stockId);

    res.status(200).json({
        success: true,
        message: 'Stock Deleted Successfully'
    });
});