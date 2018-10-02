/*jshint esversion: 6 */
const {Rental,validateRental} = require('../models/rental.js');
const Movie = require('../models/movies').Movie;
const Customer = require('../models/customers.js').Customer;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//GET requests view all rental
// url 'localhost:3000/api/rentals/'
router.get('/',async (req ,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    console.log(rentals);
    res.send(rentals);
});

//POST requests add a new rental
// url 'localhost:3000/api/rentals/'
router.post('/', async (req,res) => {
    const result = validateRental(req.body); 
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }
    const customer = Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(400).send("Invalid customer");
    }
    const movie = Movie.findById(req.body.movieId);
    if (!movie) {
        return res.status(400).send("Invalid movie");
    }
    if(movie.numberInStock === 0){
        return res.status(400).send("Movie not in stock");
    }
    const rental = new Rental({
        customer: {
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie: {
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
	});
    const resultrental = await rental.save();
    movie.numberInStock--;
    movie.save();
    console.log('resultmovie', resultmovie);
    res.send(resultmovie);
    // renal.save() and movie.save() should be atomic both should complete or both rollback 
    // hence we should use transaction in sql dbs or two faced commit in mongodb but its advanced topic
    // we use an npm package that simulates transacton 
});
// Example of req body
// {
//     
// }

module.exports = router ;