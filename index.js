/*jshint esversion: 6 */
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('routes/genres.js');

app.use(express.json());
app.use('/api/genres' , genres);

//Routing
app.get('/' , (req , res) => {
    res.send("Hello friends chai peelo");
});


// Environment variable
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port} ....`);
});