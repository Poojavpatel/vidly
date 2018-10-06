/*jshint esversion: 6 */
const {Rental,validateRental} = require('../models/rental.js');
const Movie = require('../models/movies').Movie;
const Customer = require('../models/customers.js').Customer;
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

//GET requests view all rental
// url 'localhost:3000/api/rentals/'
router.get('/',async (req ,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    console.log(rentals);
    res.send(rentals);
});

//GET requests view specific rental
// url 'localhost:3000/api/rentals/:id'
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental){
        return res.status(404).send('The rental with the given ID was not found.');
    }
    res.send(rental);
});

//POST requests add a new rental
// url 'localhost:3000/api/rentals/'
router.post('/', async (req,res) => {
    const result = validateRental(req.body); 
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }
    const customer =await Customer.findById(req.body.customerId);
    if (!customer) {
        return res.status(400).send("Invalid customer");
    }
    const movie =await Movie.findById(req.body.movieId);
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
    // const resultrental = await rental.save();
    // movie.numberInStock--;
    // movie.save();
    // console.log('resultmovie', resultmovie);
    // res.send(resultmovie);
    // renal.save() and movie.save() should be atomic both should complete or both rollback 
    // hence we should use transaction in sql dbs or two faced commit in mongodb but its advanced topic
    // we use an npm package that simulates transacton
    try {
        new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id:movie_id},{ $inc:{numberInStock:-1}})
            .run()
        console.log('rental', rental);
        res.send(rental) 
    } catch (error) {
        res.status(500).send("Internal server error...");
    }  
});
// Example of req body
// {
// 	"customerId":"5b828917ad5983369495a321",
// 	"movieId":"5bb3d85d490fc21572a71510"
// }

module.exports = router ;