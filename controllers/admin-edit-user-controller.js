const employee = require('../models/employee_model.js');
const database = require('../models/database.js');

const admin_edit_user_controller = {
    get_edit_user: async function (req, res){
        res.render('admin-edit');
    },

    get_search_user: async function (req, res){
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }
        try {
            const curr_employee = await employee.findOne({ Email: email });
            if (curr_employee) {
                res.json({ success: true, curr_employee});
            } else {
                res.json({ success: false, message: 'Employee not found' });
            }
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    post_update_user: async function (req, res){
        try {
            const {Email, First_Name, Last_Name, Contact_Number, Password, Address } = req.body;
            await employee.findOneAndUpdate({Email: Email}, { First_Name: First_Name, Last_Name: Last_Name, Contact_Number: Contact_Number, Password: Password, Address: Address});
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}

/*
exports.employeeManagement = (req, res) => {
        try {
        const { _id, First_Name, Last_Name, Contact_Number, Password, Address } = req.body;
        await Employee.findByIdAndUpdate(_id, { First_Name, Last_Name, Contact_Number, Password, Address });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Handle search employee by email
exports.searchEmployee = async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const employee = await Employee.findOne({ Email: email });
        if (employee) {
            res.json({ success: true, employee });
        } else {
            res.json({ success: false, message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Handle employee update
exports.updateEmployee = async (req, res) => {
    try {
        const { _id, First_Name, Last_Name, Contact_Number, Password, Address } = req.body;
        await Employee.findByIdAndUpdate(_id, { First_Name, Last_Name, Contact_Number, Password, Address });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};*/

module.exports = admin_edit_user_controller;