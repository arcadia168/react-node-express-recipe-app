import AuthService from './AuthService';

class RecipeService {
    constructor(axios) {
        this.axios = axios;
        this.getRecipes = this.getRecipes.bind(this);
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