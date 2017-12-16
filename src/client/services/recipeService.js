import AuthService from './AuthService';

class RecipeService {
    constructor(axios) {
        this.axios = axios;
        this.getRecipes = this.getRecipes.bind(this);
    }

    //method to go and get recipes from API and return to react component.
    getRecipes() {
        return this.axios.get('/api/recipes').then((response) => {
            return response && response.data;
        }).catch((error) => {
            //if we are unauthorized, show login page
            // if (error.response.status == '401') {
            //     const auth = new AuthService();
            //     auth.login();
            // }
        });
    }
}

module.exports = RecipeService;