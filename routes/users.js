/*jshint esversion: 6 */
const {User,validateUser} = require('../models/users');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//POST requests add a new user
// url 'localhost:3000/api/users/'
router.post('/', async (req,res) => {
    const result = validateUser(req.body); 
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }

    let user= await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send("User already registered");

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
	});
    const resultuser = await user.save();
    console.log('resultuser', resultuser);
    res.send(resultuser);
});
// Example of req body
// {
// 	"name":"abc",
// 	"email":"abc@gmail.com",
//  "password":"abc123"
// }

module.exports = router ;