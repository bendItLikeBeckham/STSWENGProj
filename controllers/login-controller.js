const bcrypt = require('bcrypt');
const employee = require('../models/employee_model.js');

const MAX_ATTEMPTS = 5;       // lock after 5 wrong tries
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const login_controller = {
    post_login: async function(req, res) {
        const { email, password } = req.body;

        try {
            const user = await employee.findOne({ Email: email });

            if (!user) {
                return res.status(404).json({ message: "Incorrect Credentials!" });
            }

            // Check if account is locked
            if (user.lockUntil && user.lockUntil > Date.now()) {
                return res.status(403).json({ message: "Account locked. Try again later." });
            }

            const isMatch = await bcrypt.compare(password, user.Password);

            if (!isMatch) {
                // Increase failed attempts
                user.loginAttempts += 1;

                // Lock account if max attempts reached
                if (user.loginAttempts >= MAX_ATTEMPTS) {
                    user.lockUntil = new Date(Date.now() + LOCK_TIME);
                    user.loginAttempts = 0; // reset attempts after lock
                }

                await user.save();
                return res.status(401).json({ message: "Incorrect Credentials!" });
            }

            // Reset attempts on successful login
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();

            // Create session
            req.session.Email = email;
            req.session.Employee_Type = user.Employee_Type;

            res.status(200).json({ success: true, type: user.Employee_Type, message: "Login Successful!" });

        } catch (error) {
            console.error("Error in post_login:", error);
            res.status(500).json({ success: false, message: "Login Controller Error!" });
        }
    }
};

module.exports = login_controller;
