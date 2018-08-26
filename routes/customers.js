/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//1. Defining schema of genres
const customerSchema = mongoose.Schema({
    name:{ type:String, required:true, maxlength:50},
    phone:{ type:Number, maxlength:10, minlength:10},
    isGold:{ type:Boolean}
});
// 2.compiling schema into a model
const Customer = mongoose.model( 'Customer' , customerSchema);
// 3.Route handlers

//Validating a genre
function validateCustomer(customer){
    const schema ={
        name : Joi.string().required(),
        phone : Joi.number().min(10).max(10),
        isGold : Joi.boolean()
    };
    return Joi.validate(customer , schema);
}

module.exports = router ;