const bcrypt = require('bcrypt');
const employee = require('../models/employee_model.js');
const database = require('../models/database.js');

const SALT_ROUNDS = 10;

const employee_edit_user_controller = {
    get_employee_edit_user: async function (req, res) {
        const user = await employee.findOne({ Email: req.session.Email });
        console.log(user.Employee_Type);
        res.render('user-edit', {
            Email: user.Email,
            Contact_Number: user.Contact_Number,
            Password: user.Password,
            First_Name: user.First_Name,
            Last_Name: user.Last_Name,
            Employee_type: user.Employee_type,
            Address: user.Address
        });
    },

    post_employee_update_user: async function (req, res) {
        try {
            const email = req.session.Email;
            console.log(email);
            const { Contact_Number, Password, Address } = req.body;

            let updateFields = { Contact_Number, Address };

            // Only hash if a new password is provided
            if (Password && Password.trim() !== "") {
                const hashedPassword = await bcrypt.hash(Password, SALT_ROUNDS);
                updateFields.Password = hashedPassword;
            }

            await employee.findOneAndUpdate({ Email: email }, updateFields);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    post_employee_update_user_verify: async function (req, res) {
        try {
            const { Email, Password } = req.body;

            if (!Password || Password.trim() === "") {
                return res.status(400).json({ success: false, message: "Password is required" });
            }

            const hashedPassword = await bcrypt.hash(Password, SALT_ROUNDS);

            await employee.findOneAndUpdate(
                { Email: Email },
                { Password: hashedPassword }
            );

            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};

module.exports = employee_edit_user_controller;
