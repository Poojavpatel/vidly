/*jshint esversion: 6 */
const Joi = require('joi');
const express = require('express');
const genres = require('./routes/genres.js');
const customers = require('./routes/customers.js')
const app = express();
const mongoose = require('mongoose');

// connecting to database
mongoose.connect('mongodb://localhost/vidly')
     .then(() => console.log('connected to MongoDB....'))
     .catch(err => console.log('could not connect to MongoDB....',err));

app.use(express.json());
// if url has /api/genres , follow what is specified in generes.js
app.use('/api/genres' , genres);
// if url has /api/customers , follow what is specified in customers.js
app.use('/api/customers' , customers);

//Routing
app.get('/' , (req , res) => {
    // res.send("Welcome to Vidly - a video rental service");
    res.sendFile('static/index.html');
});


// Environment variable
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port} ....`);
});