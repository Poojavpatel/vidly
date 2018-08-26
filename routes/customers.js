/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//1. Defining schema of genres
const customerSchema = mongoose.Schema({
    name:{ type:String, required:true, maxlength:50},
    phone:{ type:Number, maxlength:10, minlength:10},
    isGold:{ type:Boolean, default:false}
});
// 2.compiling schema into a model
const Customer = mongoose.model( 'Customer' , customerSchema);
// 3.Route handlers

//GET requests view all customers
// url 'localhost:3000/api/customers/'
router.get('/',async (req ,res) => {
    const customers = await Customer.find().sort('name');
    console.log(customers);
    res.send(customers);
});

// url 'localhost:3000/api/customers/mamu'
router.get('/:name',async (req ,res) => {
    const a = req.params.name ;
    const customer = await Customer.find({name:a});
    if(!customer){
      return  res.status(404).send("this customer was not found");
    }
    res.send(customer);
});

//POST requests add a new customer
// url 'localhost:3000/api/customers/'
router.post('/', async (req,res) => {
    const result = validateCustomer(req.body); 
    if(result.error){
       return res.status(400).send("name is required and phone no should be 10 chars long");
    }
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold:req.body.isGold
	});
    const resultcustomer = await customer.save();
    console.log('resultcustomer', resultcustomer);
    res.send(resultcustomer);
});
// Example of req body
// {
// 	"name":"Priya",
// 	"phone":0123456789,
//  "isGold":true
// }

//PUT requests update a genre
// url 'localhost:3000/api/genres/5b811bf4ac3c241c9920aa30'
router.put('/:id' , async (req ,res) => {
    const result = validateGenre(req.body); 
    if(result.error){return res.status(400).send("name is required and should be atleast 3 chars long");}
    const genre = await Genre.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name}} , {new:true});
    if(!genre){return  res.status(404).send("this genre was not found");}
    console.log('genre', genre);
    res.send(genre);
});

//DELETE requests delete a genre
// url 'localhost:3000/api/genres/horror'
router.delete('/:id' ,async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre){return  res.status(404).send("this genre was not found");}
    res.send(genre);
});

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