/*
Functions:
Notification system model/attributes
*/

var mongoose = require('mongoose');

var notification_schema = new mongoose.Schema({
    notification_Message: { 
        type: String,
        required: true   
    },
    notification_Date: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('notification', notification_schema);