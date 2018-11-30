/*jshint esversion: 6 */
const {Movie,validateMovie} = require('../models/movies.js');
const {Genre} = require('../models/genres.js');
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
       return res.status(400).send(result.error.details[0].message);
    }
    const genre =await Genre.findById(req.body.genreId);
    if (!genre) {
        return res.status(400).send("Invalid genre");
    }
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
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
//     "genreId":"5b8267ba016edc22fee53e3e",
//     "numberInStock":2,
//     "dailyRentalRate":500
// }

//DELETE requests delete a movie
// url 'localhost:3000/api/movies/5b8267a8016edc22fee53e3d'
router.delete('/:id' ,async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie){return  res.status(404).send("this movie was not found");}
    res.send(movie);
});

module.exports = router ;