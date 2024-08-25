const billModel = require('./bill.model');
const customerModel = require('../customer/customer.model');
const asyncHandler = require('../../utils/asyncHandler');
const CustomError = require('../../utils/customError');

/*
@GenerateCustomerBill

@method: POST

@routes
local - http://localhost:4000/api/v1/bills/generate
prod - https://ims-backend.render.app/api/v1/bills/generate

**description
step 1 - take user id from req.user
step 2 - take cust.id and items array from req.body
step 3 - check if any of the fields are empty or not
step 4 - throw error if any of the fields are empty
step 5 - use create query to add the billing data to the DB

@parameters - userId, custId, items, amount

@returns - success or failure response
*/
exports.GenerateCustomerBill = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { custName, custPhone, items, amount } = req.body;

    let customer = await customerModel.findOne({ contact_no: custPhone });

    if(customer === null) {
        customer = await customerModel.create({
            cust_name: custName,
            contact_no: custPhone
        });
    }

    if(!items || !amount) {
        throw new CustomError('Either of the fields are empty', 404);
    }

    const bill = await billModel.create({
        cust_id: customer._id,
        generated_by: _id,
        items: items,
        amount: amount
    });

    res.status(200).json({
        success: true,
        message: 'Bill Generated Successfully'
    });
});

/*
@GetGeneratedBills

@method: GET

@routes
local - http://localhost:4000/api/v1/bills/get
prod - https://ims-backend.render.app/api/v1/bills/get

**description
step 1 - get the userId from req.user
step 2 - query the DB to find all the bills generated from this userId
step 3 - send the the found bills as response

@parameters - userId

@returns - bills object array
*/
exports.GetGeneratedBills = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const bills = await billModel.find().populate('cust_id generated_by');

    res.status(200).json({
        success: true,
        message: 'Got All Bills Successfully',
        bills
    });
});