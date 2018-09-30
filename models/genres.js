/*jshint esversion: 6 */
/* all code for defining and validaing genre */
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name:{ type:String, required:true, minlength:3, maxlength:50}
});
const Genre = mongoose.model( 'Genre' , genreSchema);

//Validating a genre
// moved to ./models/genres.js
function validateGenre(genre){
    const schema ={
        name : Joi.string().min(3).required(),
        movie : Joi.string().min(3)
    };
    return Joi.validate(genre , schema);
}

module.exports.Genre=Genre;
module.exports.validateGenre=validateGenre;
module.exports.genreSchema=genreSchema;