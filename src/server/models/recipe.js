// server/models/recipe.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our recipe model
// module.exports allows us to pass this to other files when it is called
var ingredientSchema = new mongoose.Schema({
    quantity: String,
    name: String
})

var recipeSchema = new mongoose.Schema({
    name: String,
    cookingTime: String,
    mainIngredients: [String],
    ingredients: [ingredientSchema],
    image: String
})

module.exports = mongoose.model('Book', recipeSchema);