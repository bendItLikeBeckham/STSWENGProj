/*
Functions:
-Routing of the web service pages and CRUD operations
-Routing access limitations depending if the employee is logged in and employee type
*/

const controllers = require('../controllers/controller');
const login_controllers = require('../controllers/login-controller');
const otp_controller = require('../controllers/otp-controller');
const employee_clockpage_controllers = require('../controllers/employee-clockpage-controller');
const logout_controllers = require('../controllers/logout-controller');

const express = require('express');
const app = express();
app.use(express.json());

function initial_process(req, res, next){
    if(!req.session.Email){
        res.redirect('/');
    }else{
        next();
    }
}

function must_be_logged_out(req, res, next){
    if(req.session.Email){
        if(req.session.Employee_Type === "Admin"){
            res.redirect('/admin_dashboard');
        }else if(req.session.Employee_Type === "Employee"){
            res.redirect('/employee_clockpage');
        }else{
            res.redirect('/work_from_home_clockpage');
        }
    }else{
        next();
    }
}

function employee_access(req, res, next){
    if(req.session.Employee_Type === "Work From Home"){
        res.redirect('/work_from_home_clockpage');
    }else{
        next();
    }
}

function wfh_access(req, res, next){
    if(req.session.Employee_Type === "Employee"){
        res.redirect('/employee_clockpage');
    }else{
        next();
    }
}

function employee_wfh_access(req, res, next){
    if(req.session.Employee_Type === "Admin"){
        res.redirect('/admin_dashboard');
    }else{
        next();
    }
}

function admin_access(req, res, next){
    if(req.session.Employee_Type === "Employee"){
        res.redirect('/employee_clockpage');
    }else if(req.session.Employee_Type === "Work From Home"){
        res.redirect('/work_from_home_clockpage');
    }else{
        next();
    }
}

//initial routes access
app.get('/', must_be_logged_out, controllers.get_index);
//app.post('/add_forgot_password', must_be_logged_out, forgot_password_controllers.post_add_forgot_password);
app.post('/login_account', must_be_logged_out, login_controllers.post_login);
app.get('/logout', initial_process, logout_controllers.get_logout);

app.post('/generate_otp', initial_process, employee_wfh_access, employee_access, otp_controller.post_generate_otp);
app.post('/verify_otp', initial_process, employee_wfh_access, employee_access, otp_controller.post_verify_otp); 

app.get('/time_in_status', initial_process, employee_wfh_access, employee_clockpage_controllers.get_employee_time_in_status);
app.post('/employee_time_in', initial_process, employee_wfh_access, employee_clockpage_controllers.post_employee_time_in);
app.post('/employee_time_out', initial_process, employee_wfh_access, employee_clockpage_controllers.post_employee_time_out);

app.get('/employee_clockpage', initial_process, employee_wfh_access, employee_access, employee_clockpage_controllers.get_employee_clockpage);


module.exports = app;