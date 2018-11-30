/*jshint esversion: 6 */
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validateUser} = require('../models/users');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//GET requests view all users
// url 'localhost:3000/api/users/'
router.get('/',async (req ,res) => {
    const users = await User.find().sort('name');
    console.log(users);
    res.send(users);
});

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
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();

    // Returning json web token as an header of response
    const token = jwt.sign({_id:user.id},'jwtPrivateKey');
    res.header('x-auth-token',token).send( _.pick(user,['_id','name','email']));
});
// Example of req body
// {
// 	"name":"abc",
// 	"email":"abc@gmail.com",
//  "password":"abc123"
// }

module.exports = router ;