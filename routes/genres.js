/*jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

// we donot connect to db here instead we do that in index as we will be connecing for many apis

// genres = [
//     { id:1 , name:"horror" , movie:"Annabela"},
//     { id:2 , name:"romantic", movie:"Titanic"},
//     { id:3 , name:"animation" , movie:"Incredibles2"}
// ];

/* Instead of hardcoding this array we will use MongoDB(follow steps from mongodbtest/test repo)*/
//1. Defining schema of genres
const genreSchema = mongoose.Schema({
    name:{ type:String, required:true, minlength:3, maxlength:50}
});
// 2.compiling schema into a model
const Genre = mongoose.model( 'Genre' , genreSchema);


// url 'localhost:3000/api/genres/'
router.get('/',async (req ,res) => {
    const genres = await Genre.find().sort('name');
    console.log(genres);
    res.send(genres);
});

//GET requests view all genres
// url 'localhost:3000/api/genres/horror'
router.get('/:name',(req ,res) => {
    const a = req.params.name ;
    const genre = genres.find(c => c.name === a);
    if(!genre){
      return  res.status(404).send("this genre was not found");
    }
    res.send(genre);
});

//POST requests add a new genre
// url 'localhost:3000/api/genres/'
router.post('/', (req,res) => {
    const result = validateGenre(req.body); 
    if(result.error){
       return res.status(400).send("name and movie is rquired and should be atleast 3 chars long");
    }
    const genre = {
        id : genres.length +1 ,
        name : req.body.name ,
        movie : req.body.movie
    };
    genres.push(genre);
    res.send(genre);
});
// Example of req body
// {
// 	"name":"biography",
// 	"movie":"sanju"
// }

//PUT requests update a genre
// url 'localhost:3000/api/genres/horror'
router.put('/:name' , (req ,res) => {
    const genre = genres.find(c => c.name === req.params.name);
    if(!genre){
      return  res.status(404).send("this genre was not found");
    }
    const result = validateGenre(req.body); 
    if(result.error){
       return res.status(400).send("name is required and should be atleast 3 chars long");
    }
    if(req.body.name) genre.name = req.body.name;
    if(req.body.movie) genre.movie = req.body.movie;
    res.send(genre);
});

//DELETE requests delete a genre
// url 'localhost:3000/api/genres/horror'
router.delete('/:name' ,(req,res) => {
    const genre = genres.find(c => c.name === req.params.name);
    if(!genre){
        return  res.status(404).send("this genre was not found");
    }
    const index = genres.indexOf(genre);
    genres.splice(index , 1);
    res.send(genre);
});

//Validating a genre
function validateGenre(genre){
    const schema ={
        name : Joi.string().min(3).required(),
        movie : Joi.string().min(3)
    };
    return Joi.validate(genre , schema);
}

module.exports = router ;