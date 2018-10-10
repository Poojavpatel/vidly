/*jshint esversion: 6 */
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//POST requests add a new user
// url 'localhost:3000/api/users/'
router.post('/', async (req,res) => {
    const result = validate(req.body); 
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }

    let user= await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    res.send(true);
});
// Example of req body
// {
// 	"name":"abcde",
// 	"email":"abcde@gmail.com",
// 	"password":"abcde12345"
// }	

// validating 
function validate(req){
    const schema ={
        email : Joi.string().min(3).max(50).required().email(),
        password : Joi.string().min(3).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router ;