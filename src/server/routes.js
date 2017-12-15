 // grab the models we want to use
 var Recipe = require('./models/recipe');
 var User = require('./models/user');
 var http = require('http');

 module.exports = function (app) {

     // server routes ===========================================================
     // handle things like api calls
     app.get('/api/recipes', function (req, res) {

         //Query database for all recipes and return recipes.
         Recipe.find(function (err, recipes) {

             // if there is an error retrieving, send the error. 
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(recipes); // return all nerds in JSON format
         });
     });

     //Route to post user data to the DB from Auth0
     app.post('/api/users/', function (req, res) {
         //Get user from params
         var userToAddOrUpdate = req.body;

         //Upsert the user data into MongoDB
         User.findOneAndUpdate({
             sub: userToAddOrUpdate.sub
         }, userToAddOrUpdate, {
             upsert: true,
             new: true
         }, function (err, doc) {
             if (err) {
                 console.error(JSON.stringify(err));
                 return reject(err);
             }

             res.send(doc);
         })
     })

     //Route to return the favourite recipes of a given user.
     app.get('/api/users/:userid/favourites', function (req, res) {

         //get book id
         var sub = req.params.userid;

         User.findOne({
             sub: userId //TODO: properly parse userId into Mongoose/Mongo ID
         }, function (err, user) {

             // if there is an error retrieving, send the error. 
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(user); // return all nerds in JSON format
         });
     });

     //route to post a favourite recipe for a given user
     app.post('/api/users/:userid/favourites/:recipeid', function (req, res) {
         //TODO: store a recipe here on a user
     });

     //route to delete a favourite recipe for a given user
     app.delete('/api/users/:userid/favourites/:recipeid', function (req, res) {
         //TODO: remove a favourite recipe here from a user
     });

     // frontend routes =========================================================
     // route to handle all requests

     app.get('//appRoutes.js', function (req, res) {
         res.sendfile('./public/js/appRoutes.js');
     })

     //  app.get('/css/style.css', function (req, res) {
     //      res.sendfile('./public/css/style.css');
     //  })
 };