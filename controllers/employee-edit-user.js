const employee = require('../models/employee_model.js');
const database = require('../models/database.js');

const employee_edit_user_controller = {
    get_employee_edit_user: async function (req, res){
        const user = await employee.findOne({Email: req.session.Email});
        console.log(user.Employee_Type)
        res.render('user-edit', {Email: user.Email, Contact_Number: user.Contact_Number, Password: user.Password, First_Name: user.First_Name, Last_Name: user.Last_Name, Employee_type: user.Employee_type, Address: user.Address});
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
    },

    post_employee_update_user_verify: async function (req, res){
        try {
            const {Email, Password} = req.body;
            await employee.findOneAndUpdate({Email: Email}, {Password: Password});
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
}


module.exports = employee_edit_user_controller;