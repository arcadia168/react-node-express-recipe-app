 // grab the models we want to use
 var Recipe = require('./models/recipe');
 var http = require('http');

 module.exports = function (app) {

     // server routes ===========================================================
     // handle things like api calls
     // authentication routes

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

     //Route to return the favourite recipes of a given user.
     app.get('/api/users/:userid/favourites', function (req, res) {

         //get book id
         var userId = req.params.title;

         User.findOne({
             userId: userId //TODO: properly parse userId into Mongoose/Mongo ID
         }, function (err, book) {

             // if there is an error retrieving, send the error. 
             // nothing after res.send(err) will execute
             if (err)
                 res.send(err);

             res.json(book); // return all nerds in JSON format
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
     // examples:
     //  app.get('*', function (req, res) {
     //      res.sendfile('./public/views/index.html'); // load our public/index.html file
     //  });

     //  app.get('/js/appRoutes.js', function (req, res) {
     //      res.sendfile('./public/js/appRoutes.js');
     //  })

     //  app.get('/js/app.js', function (req, res) {
     //      res.sendfile('./public/js/app.js');
     //  })

     //  app.get('/css/style.css', function (req, res) {
     //      res.sendfile('./public/css/style.css');
     //  })
 };