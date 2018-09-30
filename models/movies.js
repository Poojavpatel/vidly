/*jshint esversion: 6 */
/* all code for defining and validaing movie */
const mongoose = require('mongoose');
const genreSchema = require('./genres.js').genreSchema;

const movieSchema = mongoose.Schema({
    title:{ type:String},
    genre:genreSchema,
    numberInStock:{type:Number},
    dailyRentalRate:{type:Number}
});
const Movie = mongoose.model( 'Movie' , movieSchema);

module.exports.Movie=Movie;