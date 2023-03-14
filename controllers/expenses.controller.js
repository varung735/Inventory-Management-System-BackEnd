const expensesModel = require('../models/expenses.model');

//to get all the expenses data from DB
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expensesModel.find();

        res.status(200).json({
            "success": true,
            "message": "Got all Expenses Successfully",
            "expenses": expenses
        });
    } catch (error) {
        console.log(error);
    }
}

//to add the expense data to DB
exports.addExpenses = async (req, res) => {
    try {
        let { expense_name, type, paid_to, amount, added_by } = req.body;

        //to check any of the fields's missing
        if(!(expense_name && type && paid_to && amount && added_by)){
            res.status(400).send("All Fields are required.");
        }
        else{
            //adding expense to DB
            const addedExpense = await expensesModel.create({
                expense_name,
                type,
                paid_to,
                amount,
                added_by
            });
    
            res.status(200).json({
                "success": true,
                "message": "Added Expense Successfully",
                "added_expense": addedExpense
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Add Expense",
            "error": error.message
        });
        console.log(error);
    }
}

///to update the expense data to DB
exports.updateExpenses = async (req, res) => {
    try {
        let id = req.params.id;

        //checking if expense exists in DB
        const expense = await expensesModel.find({id: id});
        if(!expense){
            res.status(400).send("Expense doesn't exists");
        }
        else{
            //updating expense in DB
            const updatedExpense = await expensesModel.findByIdAndUpdate(id, req.body, {new: true});
    
            res.status(200).json({
                "success": true,
                "message": "Updated Expense Successfully",
                "updated_expense": updatedExpense
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Expense",
            "error": error.message
        });
        console.log(error);
    }
}

//to delete the expense from DB
exports.deleteExpenses = async (req, res) => {
    try {
        let id = req.params.id;

        //checking if expense exists in DB
        const expense = await expensesModel.find({id: id});
        if(!expense){
            res.status(400).send("Expense doesn't exists");
        }
        else{
            //deleting expense in DB
            const deletedExpense = await expensesModel.findByIdAndDelete(id);
    
            res.status(200).json({
                "success": false,
                "message": "Expense Deleted Successfully",
                "deleted_expense": deletedExpense
            });
        }
        
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Delete Expense",
            "error": error.message
        });
        console.log(error);
    }
}