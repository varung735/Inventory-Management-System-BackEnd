const empModel = require('../models/employees.model');

// exports.getSalaries = async (req, res) => {
//     const id = req.body.id;

//     try {
//         const employee = await empModel.find({ "_id": id });
//         if(!employee){
//             res.status(400).send("Employee Doesn't Exists");
//         }
//         else{
//             res.status(200).json({
//                 "success": true,
//                 "message": "Got All Salaries Successfully",
//                 "salaries": employee.salary
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             "success": false,
//             "message": "Cannot Get Salaries",
//             "error": error.message
//         });
//         console.log(error);
//     }
// } 

exports.getSalary = async (req, res) => {
    try {
        const {id, salary_id} = req.body;

        const employee = await empModel.find({ "_id" : id}, { "salary._id": salary_id });
        if(!employee){
            res.status(400).send("Employee Doesn't Exists");
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Got Salary Successfully",
                "salary": employee
            })
        }
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Get Salary",
            "error": error.message
        });
        console.log(error);
    }
}

exports.addSalary = async (req, res) => {
    try {
        const { id, paid_on, amount } = req.body;

        const employee = await empModel.updateOne({ "_id": id }, { $push: { "salary": { paid_on: paid_on, amount: amount } } });
        
        if(!employee){
            res.status(400).send("Employee Doesn't Exists");
        }
        else{
            const employee = await empModel.find({ "_id": id });
            res.status(200).json({
                "success": true,
                "message": "Added Salary Successfully",
                "added_salary": employee.salary
            });
        }

    } catch (error) {
        res.json(400).json({
            "success": false,
            "message": "Cannot Add Salary",
            "error": error.message
        });
        console.log(error);
    }
}

exports.updateSalary = async (req, res) => {
    try {
        const { id, salary_id, paid_on, amount } = req.body;

        const employee = await empModel.updateOne({ "_id": id, "salary._id": salary_id }, 
        { $set: { "salary.$.paid_on": paid_on, "salary.$.amount": amount } },
        { arrayFilters: [{"salary._id": salary_id}] });

        if(!employee){
            res.status(400).send("Employee Doesn't Exists");
        }
        else{
            const employee = await empModel.findOne({ "_id": id, "salary._id": salary_id });
            res.status(200).json({
                "success": true,
                "message": "Updated Salary Successfully",
                "updated_salary": employee.salary
            });
        }
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Update Salary",
            "error": error.message
        });
        console.log(error);
    }
}

exports.deleteSalary = async (req, res) => {
    try {
        const { id, salary_id } = req.body;

        const employee = await empModel.updateOne({ "_id": id }, 
        { $pull: {"salary": { "_id" : salary_id } } });

        if(!employee){
            res.status(400).send("Employee Doesn't Exists");
        }
        else{
            res.status(200).json({
                "success": true,
                "message": "Salary Deleted Successfully"
            });
        }

    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": "Cannot Delete Salary",
            "error": error.message
        });
        console.log(error);
    }
}