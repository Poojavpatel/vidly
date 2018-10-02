/*jshint esversion: 6 */
/* all code for defining and validaing rental */
const Joi = require('joi');
const mongoose = require('mongoose');

// here we are not reusing customer and movies schemas
// as it may have 50 properties..we only need primary properties 
const rentalSchema = mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{type:String, required:true, },
            isGold:{type:Boolean, default:false},
            phone:{type:String, required:true}
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{type:String, required:true, },
            dailyRentalRate:{type:Number},
            phone:{type:String, required:true}
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
        customerId:Joi.string().required,
        movieId:Joi.string().required
    };
    return Joi.validate(rental , schema);
}

module.exports.Rental=Rental;
module.exports.validateRental=validateRental;