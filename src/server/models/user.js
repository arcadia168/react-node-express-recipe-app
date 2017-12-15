// server/models/user.js
var mongoose = require('mongoose');

var Recipe = require('./recipe');

// define our user model
var userSchema = new mongoose.Schema({
    email: String,
    email_verified: Boolean,
    name: String,
    nickname: String,
    picture: String,
    sub: String,
    updated_at: Date,
    favouriteRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}] //array of Recipes with foriegn key 
})

module.exports = mongoose.model('User', userSchema);