const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next) {
    const token = req.header('x-auth-header');
    if(!token) return res.status(401).send('Access Denied. No token provided');
    //jwt.verify(jwtstring,privatekey) decodes and returns a payload
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user =decoded;
        next();
    } catch (ex) {
       res.status(400).send('Invalid Token'); 
    } 
}