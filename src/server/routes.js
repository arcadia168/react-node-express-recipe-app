 // grab the models we want to use
 var Recipe = require('./models/recipe');
 var User = require('./models/user');
 var http = require('http');

 module.exports = function (app, checkJwt) {

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

     //route to find a specific recipt using id
     //TODO: test this route
     app.get('/api/recipe/:recipeId', function (req, res) {

         var recipeId = req.params.recipeId;

         //TODO: Write test to ensure you can't pass an empty recipe_id
         if (!recipeId) {
             res.status(400);
             res.send("You have not supplied a valid recipe_id parameter in the URL");
         }

         //Query the DB for the recipe
         Recipe.findById(recipeId, function (err, recipe) {
             if (err) {
                 res.status(503);
                 res.send(error);
             }

             //Otherwise return the recipe data
             res.json(recipe);
         });
     })

     //Route to post user data to the DB from Auth0
     app.post('/api/users/', checkJwt, function (req, res) {
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
                 return res.send(err);
             }

             res.send(doc);
         })
     })

     //const checkGetScopes = jwtAuthz([ 'get:users' ]);
     //Route to return the favourite recipes of a given user.
     app.get('/api/users/:userId/favourites', checkJwt, function (req, res) {

         //get user id
         var sub = req.params.userId;

         User.findOne({
                 sub: sub //TODO: properly parse userId into Mongoose/Mongo ID
             })
             .populate('favouriteRecipes')
             .exec(function (err, user) {
                 // if there is an error retrieving, send the error. 
                 // nothing after res.send(err) will execute
                 if (err)
                     res.send(err);

                 res.json(user.favouriteRecipes); // return all recip in JSON format
             })
     });

     //route to post a favourite recipe for a given user
     app.post('/api/users/:userId/favourites/:recipeId', checkJwt, function (req, res) {
         const recipeId = req.params.recipeId;
         const userId = req.params.userId;

         //find the recipe with this id
         Recipe.findById(recipeId, function (err, foundRecipe) {
             if (err) {
                 res.send(err);
             } else if (!foundRecipe) {
                 res.status(404)
                 res.send('No recipe with the id: ' + recipeId + ' was found');
             }

             //Otherwise find the user and append recipe id to favourites
             User.findOne({
                     sub: userId
                 })
                 .populate('favouriteRecipes')
                 .exec(function (err, foundUser) {
                     if (err) {
                         res.send(err);
                     } else if (!foundUser) {
                         res.status(404).end();
                     }

                     if (!foundUser.favouriteRecipes) {
                         foundUser.favouriteRecipes = [foundRecipe._id];
                     } else {

                         //Add recipe to list if it doesn't already exist
                         let recipeIsAlreadyFavourited = false;

                         //Use for not forEach, so we can break out of it for efficiency
                         for (let i = 0; i < foundUser.favouriteRecipes.length; i++) {
                             if (foundUser.favouriteRecipes[i]._id.toString() == foundRecipe._id.toString()) {
                                 recipeIsAlreadyFavourited = true;
                                 break;
                             }
                         }

                         if (!recipeIsAlreadyFavourited) {
                             foundUser.favouriteRecipes.push(foundRecipe._id);

                             //Now update the found user.
                             foundUser.save(function (err) {
                                 if (err) {
                                     res.status(500);
                                     res.send(err);
                                 } else {
                                     //Say user updated
                                     res.status(200);
                                     res.json(foundUser);
                                 }
                             });
                         } else {
                             res.status(200);
                             res.json(foundUser);
                         }
                     }
                 });
         });
     });

     //route to delete a favourite recipe for a given user
     app.delete('/api/users/:userId/favourites/:recipeId', checkJwt, function (req, res) {

         var userId = req.params.userId;
         var recipeId = req.params.recipeId;

         User.findOne({
                 sub: userId
             })
             .populate('favouriteRecipes')
             .exec(function (err, foundUser) {
                 //remove the recipe with the specified id and return updated favourites to client
                 if (foundUser.favouriteRecipes) {
                     for (let i = 0; i < foundUser.favouriteRecipes.length; i++) {
                         if (foundUser.favouriteRecipes[i]._id == recipeId) {
                             foundUser.favouriteRecipes.splice(i, 1);
                         }
                     }
                 }

                 //Now update the found user.
                 foundUser.save(function (err) {
                     if (err) {
                         res.status(500);
                         res.send(err);
                     } else {
                         //Say user updated
                         res.status(200);
                         res.json(foundUser);
                     }
                 });
             });
     });
 };