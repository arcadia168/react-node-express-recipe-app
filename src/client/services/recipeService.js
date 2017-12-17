import AuthService from './AuthService';

class RecipeService {
    constructor(axios) {
        this.axios = axios;
        this.favouriteRecipes = undefined;
        this.getRecipes = this.getRecipes.bind(this);
        this.searchMatchingRecipeIngredients = this.searchMatchingRecipeIngredients.bind(this);
        this.sortByKey = this.sortByKey.bind(this);
        this.compareRecipeLists = this.compareRecipeLists.bind(this);
        this.compareUserFavourites = this.compareUserFavourites.bind(this);
    }

    compareRecipeLists(recipeList, otherRecipeList) {
        if (recipeList.length !== otherRecipeList.length) {
            return false
        }

        //if the lists are the same size, check the _ids, after sorting
        recipeList = this.sortByKey(recipeList, name);
        otherRecipeList = this.sortByKey(otherRecipeList, name);

        for (let i = 0; i < recipeList.length; i++) {
            let recipe = recipeList[i];
            if (recipe._id != otherRecipeList[i]._id) {
                return false;
            }
        };

        //if all of the above tests have passed, lists are the same
        return true;
    }

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    filterRecipes(recipes, filterTerm) {
        //filter on recipe name, ingredient or cooking time.
        let matchingRecipes = [];

        //sanitze filter term
        filterTerm = filterTerm.toLowerCase();

        recipes.forEach((recipe, index, recipes) => {
            if (recipe.name.toLowerCase().indexOf(filterTerm) > -1) { //recipe name
                matchingRecipes.push(recipe);
            } else if (this.searchMatchingRecipeIngredients(recipe, filterTerm)) { //recipe ingredients
                matchingRecipes.push(recipe);
                //if cooking time is less than cooking time searched for
            } else if (Number(recipe.cookingTime.substring(0, 2)) < Number(filterTerm.substring(0, 2))) {
                matchingRecipes.push(recipe);
            }
        });

        return matchingRecipes;
    }

    searchMatchingRecipeIngredients(recipe, filterTerm) {
        //iterate over recipe ingredients, looking for match
        return recipe.ingredients.some((ingredient, index) => {
            return ingredient.name.toLowerCase().indexOf(filterTerm) > -1;
        });
    }

    //method to go and get recipes from API and return to react component.
    getRecipes() {
        return this.axios.get('/api/recipes').then((response) => {
            if (response.data) {
                //cache the recipes
                return response && response.data;
            }
        }).catch((error) => {
            //if we are unauthorized, show login page
            // if (error.response.status == '401') {
            //     const auth = new AuthService();
            //     auth.login();
            // }
        });
    }

    getUserFavourites(userId, usedCachedValues) {

        if (this.favouriteRecipes && usedCachedValues) {
            return Promise.resolve(this.favouriteRecipes);
        };

        return this.axios.get(`/api/users/${userId}/favourites`)
            .then((userFavourites) => {
                //append this recipe to the cached list of recipes
                this.favouriteRecipes = userFavourites.data;
                return userFavourites.data;
            }).catch((error) => {
                console.log('An error occurred when retrieving user favourite recipes from the API: ' + error);
                return null; //return an empty recipe
            });
    }
    
    compareUserFavourites(userFavourites, otherUserFavourites){
        return JSON.stringify(userFavourites) === JSON.stringify(otherUserFavourites);
    }

    getRecipeById(recipeIdToFind) {
        //check if recipe already exists on client side, otherwise query api for it
        //if the recipe did not already exist, query api for it.
        return this.axios.get(`/api/recipe/${recipeIdToFind}`)
            .then((retrievedRecipe) => {
                //append this recipe to the cached list of recipes
                if (!this.retrievedRecipes) {
                    this.retrievedRecipes = [retrievedRecipe.data];
                } else {
                    this.retrievedRecipes.push(retrievedRecipe.data);
                }
                return retrievedRecipe.data;
            }).catch((error) => {
                console.log('An error occurred when retrieving a recipe from the API: ' + error);
                return null; //return an empty recipe
            });
    }
}

module.exports = RecipeService;