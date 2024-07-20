const employee = require('../models/employee_model.js');
const database = require('../models/database.js');

const employee_edit_user_controller = {
    get_employee_edit_user: async function (req, res){
        res.render('user-edit');
    },

    post_employee_update_user: async function (req, res){
        try {
            const email = req.session.Email;
            console.log(email)
            const {Contact_Number, Password, Address } = req.body;
            await employee.findOneAndUpdate({Email: email}, {Contact_Number: Contact_Number, Password: Password, Address: Address});
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}


module.exports = employee_edit_user_controller;