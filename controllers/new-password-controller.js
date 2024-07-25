const employee = require('../models/employee_model.js');

const nodemailer = require('nodemailer');


const employee_change_password_controller = {

    get_verify_email: async function (req,res){
        res.render('verify-forgot-password');
    },
    
    send_email : function (req, res){
        const { email }  = req.body;
        const {hostname} = req.body;
        const http = 'http://'

        console.log(hostname)
        const baseUrl = 'http://localhost:3000';
        const verificationLink = `${http}${hostname}/verify_email?email=${email}`;

        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }
        
            console.log('Credentials obtained, sending message...');
        
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            const mailOptions = {
                from: 'Email Verifier',
                to: email,
                subject: 'Email Verification',
                html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                res.send(nodemailer.getTestMessageUrl(info));
            });
        })
    },

    verify_email: function (req,res){
        const { email } = req.query;
        res.render('new-password', { email });
    }
}

module.exports = employee_change_password_controller;