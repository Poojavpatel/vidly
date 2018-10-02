/*jshint esversion: 6 */
const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js');
const movies = require('./routes/movies.js');
const rental = require('./routes/rental.js');
const app = express();
const mongoose = require('mongoose');
const path = require("path");

// connecting to database
mongoose.connect('mongodb://localhost/vidly')
     .then(() => console.log('connected to MongoDB....'))
     .catch(err => console.log('could not connect to MongoDB....',err));

app.use(express.json());
// if url has /api/genres , follow what is specified in generes.js
app.use('/api/genres' , genres);
// if url has /api/customers , follow what is specified in customers.js
app.use('/api/customers' , customers);
// if url has /api/movies , follow what is specified in movies.js
app.use('/api/movies' , movies);
// if url has /api/rentals , follow what is specified in rental.js
app.use('/api/rentals' , rental);


app.use(express.static('static'));
app.get('/' , (req , res) => {
    // res.send("Welcome to Vidly - a video rental service");
    res.sendFile(path.join(__dirname+'/static/index.html'));
});


// Environment variable
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port} ....`);
});