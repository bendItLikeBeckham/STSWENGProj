const Notification = require('../models/notifications_model.js');

const messages_controller = {

    get_admin_message: async (req, res) => {
        try{
            const notifications = await Notification.find();
            notifications.sort((a, b) => a.notification_Date - b.notification_Date);
            res.render('admin-create-message', { notifications })
        } catch (error){
            res.status(500).send(error);
        }
    },

    get_employee_message: async (req, res) => {
        try{
            const notifications = await Notification.find();
            notifications.sort((a, b) => a.notification_Date - b.notification_Date);
            res.render('user-message', { notifications })
        } catch (error){
            res.status(500).send(error);
        }
    },

    add_notification: async (req, res) => {
        const { message } = req.body;
        const newNotification = new Notification({
            notification_Message: message,
            notification_Date: new Date().toLocaleString()
        });
        try {
            await newNotification.save();
            res.status(201).send();
        } catch (error) {
            res.status(500).send(error);
        }
    },

    delete_notification: async (req, res) => {
        const { id } = req.body;
        console.log(id)
        try {
            await Notification.findOneAndDelete({_id : id});
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = messages_controller;