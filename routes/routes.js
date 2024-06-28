/*
Functions:
-Routing of the web service pages and CRUD operations
-Routing access limitations depending if the employee is logged in and employee type
*/

const controllers = require('../controllers/controller');

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

module.exports = app;