/*jshint esversion: 6 */
/* all code for defining and validaing rental */
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

// here we are not reusing customer and movies schemas
// as it may have 50 properties..we only need primary properties 
const rentalSchema =new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{type:String, required:true },
            isGold:{type:Boolean, default:false},
            phone:{type:String, required: true,minlength: 5,maxlength: 50}
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{type:String, required:true},
            dailyRentalRate:{type:Number,required: true}
        }),
        required:true
    },
    dateOut:{type:Date, required:true, default:Date.now},
    dateReturned:{type:Date},
    rentalFee:{type:Number, min:0}
});
const Rental = mongoose.model( 'Rental' , rentalSchema);

//Validating a rental
function validateRental(rental){
    const schema ={
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    };
    return Joi.validate(rental , schema);
}

module.exports.Rental=Rental;
module.exports.validateRental=validateRental;