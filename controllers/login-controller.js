const bcrypt = require('bcrypt');
const employee = require('../models/employee_model.js');

const login_controller = {
    post_login: async function(req, res){
        const { email, password } = req.body;

        try {
            const user_exists = await employee.findOne({ Email: email });

            // First check if user exists before reading Password
            if (!user_exists) {
                return res.status(404).json({ message: "Incorrect Credentials!" });
            }

            const isMatch = await bcrypt.compare(password, user_exists.Password);

            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect Credentials!" });
            }

            // Create session
            req.session.Email = email;
            req.session.Employee_Type = user_exists.Employee_Type;

            // Respond depending on Employee_Type
            if (user_exists.Employee_Type === "Employee") {
                res.status(200).json({ success: true, type: "Employee", message: "Login Successful!" });
            } else if (user_exists.Employee_Type === "Work From Home") {
                res.status(200).json({ success: true, type: "Work From Home", message: "Login Successful!" });
            } else {
                res.status(200).json({ success: true, type: "Admin", message: "Login Successful!" });
            }

        } catch (error) {
            console.error("Error in post_login:", error);
            res.status(500).json({ success: false, message: "Login Controller Error!" });
        }
    }
};

module.exports = login_controller;
