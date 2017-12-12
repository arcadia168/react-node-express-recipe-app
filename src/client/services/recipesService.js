import {
    axios
} from 'axios';

class RecipesService {
    constructor() {
        this.getRecipes = this.getRecipes.bind(this);
    }

    //method to go and get recipes from API and return to react component.
    getRecipes() {
        return axios.get('api/recipes')
            .then((recipes) => {
                resolve(recipes);
            })
            .catch((error) => {
                console.log(error);

                //TODO: handle this or log some telemtry in prod etc.

                throw error;
            });
    }
}

module.exports = RecipesService;