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