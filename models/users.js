/*jshint esversion: 6 */
/* all code for defining and validaing a user */
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{ type:String, minlength:3, maxlength:50},
    email:{ type:String, unique:true, required:true, minlength:3, maxlength:50 },
    password:{ type:String, required:true ,minlength:3 }
});
userSchema.methods.generateAuthToken = function() {
    // jwt.sign({Payload},'anyPrivateKeyAsAString') jwt.sign() returns a token
    return token = jwt.sign({_id:this.id},'jwtPrivateKey');
}
const User = mongoose.model( 'User' , userSchema);

//Validating a user
function validateUser(user){
    const schema ={
        name : Joi.string().min(3).max(50),
        email : Joi.string().min(3).max(50).required().email(),
        password : Joi.string().min(3).required()
    };
    return Joi.validate(user , schema);
}

module.exports.User=User;
module.exports.validateUser=validateUser;
module.exports.userSchema=userSchema;