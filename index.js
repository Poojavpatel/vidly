/*jshint esversion: 6 */
const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

genres = [
    { id:1 , name:"horror" , movie:"Annabela"},
    { id:2 , name:"romantic", movie:"Titanic"},
    { id:3 , name:"animation" , movie:"Incredibles2"}
];

app.get('/' , (req , res) => {
    res.send("Hello friends chai peelo");
});

app.get('/api/genres',(req ,res) => {
    res.send(genres);
});

//GET requests view all genres
app.get('/api/genres/:name',(req ,res) => {
    const a = req.params.name ;
    const genre = genres.find(c => c.name === a);
    if(!genre){
      return  res.status(404).send("this genre was not found");
    }
    res.send(genre);
});

//POST requests add a new genre
app.post('/api/genres', (req,res) => {
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

//PUT requests update a genre
app.put('/api/genres/:name' , (req ,res) => {
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
app.delete('/api/genres/:name' ,(req,res) => {
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

// Environment variable
const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log(`Listening on port ${port} ....`);
});