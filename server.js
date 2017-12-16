// server.js

// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var http = require('http');
var _ = require('underscore');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// configuration ===========================================

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://bennawazcodedemos.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'react-node-recipes-auth-api',
    issuer: "https://bennawazcodedemos.eu.auth0.com/",
    algorithms: ['RS256'],
    //credentialsRequired: false
})

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3000;

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location e.g. /public/img will be /img for users
//statically serve client side files.
//serves index.html by default, React router handles the rest.
app.use(express.static(__dirname)); 
app.use('/callback', express.static(__dirname));

//for API routes, ensure users are authenticated
//app.use(jwtCheck);

// routes ==================================================
require('./src/server/routes')(app, jwtCheck); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;