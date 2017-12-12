import axios from 'axios';

class RecipeService {
    constructor() {
        this.getRecipes = this.getRecipes.bind(this);
    }

    //method to go and get recipes from API and return to react component.
    getRecipes() {
        return axios.get('api/recipes').then((response) => {
            return response && response.data;
        });
    }
}

module.exports = RecipeService;