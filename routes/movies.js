/*jshint esversion: 6 */
const {Movie,validateMovie} = require('../models/movies.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//GET requests view all movies
// url 'localhost:3000/api/movies/'
router.get('/',async (req ,res) => {
    const movies = await Movie.find();
    console.log(movies);
    res.send(movies);
});

//POST requests add a new movie
// url 'localhost:3000/api/movies/'
router.post('/', async (req,res) => {
    const result = validateMovie(req.body); 
    if(result.error){
       return res.status(400).send("title is required and should be atleast 3 chars long");
    }
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
	});
    const resultmovie = await movie.save();
    console.log('resultmovie', resultmovie);
    res.send(resultmovie);
});
// Example of req body
// {
//     "title":"24 hours",
//     "genre":"5b8267ba016edc22fee53e3e",
//     "numberInStock":2,
//     "dailyRentalRate":500
// }

module.exports = router ;