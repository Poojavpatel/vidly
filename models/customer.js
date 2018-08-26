/*jshint esversion: 6 */
/* all code for defining and validaing customer */
const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name:{ type:String, required:true, maxlength:50},
    phone:{ type:Number, maxlength:10, minlength:10},
    isGold:{ type:Boolean, default:false}
});

const Customer = mongoose.model( 'Customer' , customerSchema);

//Validating a customer
// moved to ./models/customer.js
function validateCustomer(customer){
    const schema ={
        name : Joi.string().required(),
        phone : Joi.number().min(10).max(10),
        isGold : Joi.boolean()
    };
    return Joi.validate(customer , schema);
}

module.exports.Customer=Customer;
module.exports.validateCustomer=validateCustomer;