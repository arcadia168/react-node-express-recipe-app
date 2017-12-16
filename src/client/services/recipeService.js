import AuthService from './AuthService';

class RecipeService {
    constructor(axios) {
        this.axios = axios;
        this.retrievedRecipes = undefined;
        this.getRecipes = this.getRecipes.bind(this);
    }

    //method to go and get recipes from API and return to react component.
    getRecipes(usedCachedRecipes) {

        //if we have cached recipes and user has asked to, return cached recipes
        if (usedCachedRecipes && this.retrievedRecipes) {
            return Promise.resolve(this.retrievedRecipes);
        }

        return this.axios.get('/api/recipes').then((response) => {
            if (response.data) {
                //cache the recipes
                this.retrievedRecipes = response.data;
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

    getRecipeById(recipeIdToFind, usedCachedRecipes) {
        //check if recipe already exists on client side, otherwise query api for it
        if (this.retrievedRecipes.length > 0 && usedCachedRecipes) {
            //check if this recipe already exists.
            for (let i = 0; i < this.retrievedRecipes.length; i++) {
                if (storedRecipe._id == recipeIdToFind) {
                    foundRecipe = storedRecipe;
                    return Promise.resolve(foundRecipe);
                }
            };
        }

        //if the recipe did not already exist, query api for it.
        return axios.get(`/api/recipe/${recipeIdToFind}`)
            .then((retrievedRecipe) => {
                //append this recipe to the cached list of recipes
                this.retrievedRecipes.push(retrievedRecipe);
                return retrievedRecipe;
            }).catch((error) => {
                console.log('An error occurred when retrieving a recipe from the API: ' + error);
                return null; //return an empty recipe
            });
    }
}

module.exports = RecipeService;