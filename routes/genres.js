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

//GET requests view all genres
// url 'localhost:3000/api/genres/'
router.get('/',async (req ,res) => {
    const genres = await Genre.find().sort('name');
    console.log(genres);
    res.send(genres);
});

// url 'localhost:3000/api/genres/horror'
router.get('/:name',async (req ,res) => {
    const a = req.params.name ;
    // const genre = genres.find(c => c.name === a);
    const genre = await Genre.find({name:a});
    if(!genre){
      return  res.status(404).send("this genre was not found");
    }
    res.send(genre);
});

//POST requests add a new genre
// url 'localhost:3000/api/genres/'
router.post('/', async (req,res) => {
    const result = validateGenre(req.body); 
    if(result.error){
       return res.status(400).send("name and movie is rquired and should be atleast 3 chars long");
    }
    // const genre = {
    //     id : genres.length +1 ,
    //     name : req.body.name ,
    //     movie : req.body.movie
    // };
    const genre = new Genre({
		name: req.body.name
	});
    // genres.push(genre);
    const resultgenre = await genre.save();
    console.log('resultgenre', resultgenre);
    res.send(resultgenre);
});
// Example of req body
// {
// 	"name":"biography",
// 	"movie":"sanju"
// }

//PUT requests update a genre
// url 'localhost:3000/api/genres/5b811bf4ac3c241c9920aa30'
router.put('/:id' , async (req ,res) => {
    // const genre = genres.find(c => c.name === req.params.name);
    /*const reqgenre = await Genre.find({id:req.params.id});
    reqgenre = [ { _id: 5b811bf4ac3c241c9920aa30, name: 'biography', __v: 0 } ] is of type object so we convert it into string with var b = JSON.stringify(reqgenre) we convert this string to json with  var d = JSON.parse(b); now we can access this json as var c = d[0] console.log('c', c) console.log(typeof c);
    var foo =  JSON.parse(JSON.stringify(reqgenre));
    console.log('foo', foo[0].name);
    */
    // if(!reqgenre){
    //   return  res.status(404).send("this genre was not found");
    // }
    // const result = validateGenre(req.body); 
    // if(result.error){
    //    return res.status(400).send("name is required and should be atleast 3 chars long");
    // }
    // // if(req.body.name) genre.name = req.body.name;
    // const course = await Course.findByIdAndUpdate(id,{
    //     $set:{
    //         author:'Aaron Nace',
    //         isPublished:false
    //     }
    // } , {new:true});
    const result = validateGenre(req.body); 
    if(result.error){return res.status(400).send("name is required and should be atleast 3 chars long");}
    const genre = await Genre.findByIdAndUpdate(req.params.id,{$set:{name:req.body.name}} , {new:true});
    if(!genre){return  res.status(404).send("this genre was not found");}
    console.log('genre', genre);
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