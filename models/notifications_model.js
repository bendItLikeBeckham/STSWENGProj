/*
Functions:
Notification system model/attributes
*/

var mongoose = require('mongoose');

var notification = new mongoose.Schema({
    notification_Message: { 
        type: String,
        required: true   
    },
    notification_Date: {
        type: String,
    },
});

module.exports = mongoose.model('otp', notification);