/*jshint esversion: 6 */
const _ = require('lodash');
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

    user = new User(_.pick(req.body, ['name','email','password']));
    
    await user.save();

    res.send( _.pick(user,['_id','name','email']));
});
// Example of req body
// {
// 	"name":"abc",
// 	"email":"abc@gmail.com",
//  "password":"abc123"
// }

module.exports = router ;