/*jshint esversion: 6 */
/* all code for defining and validaing movie */
const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = require('./genres.js').genreSchema;

const movieSchema = mongoose.Schema({
    title:{ type:String,required:true},
    genre: { type: genreSchema },
    numberInStock:{type:Number},
    dailyRentalRate:{type:Number}
});
const Movie = mongoose.model( 'Movie' , movieSchema);

//Validating a movie
// Joi schema is diff from mongoose schema 
// joi schema is what client sends us hence genreId is string
function validateMovie(movie){
    const schema ={
        title : Joi.string().min(3).required(),
        genreId : Joi.string(),
        numberInStock: Joi.number(),
        dailyRentalRate: Joi.number()
    };
    return Joi.validate(movie , schema);
}

module.exports.Movie=Movie;
module.exports.validateMovie=validateMovie;