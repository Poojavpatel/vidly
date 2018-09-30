/*jshint esversion: 6 */
const Movie = require('../models/movies.js');
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