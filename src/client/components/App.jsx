import React, { Component } from 'react';
// import { RecipesService } from '../services/recipesService.js'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentWillMount() {
    //make api request for recipes

    //TODO: get call working using a service class
    // RecipesService.getRecipes.then((recipes) => {
    //   this.setState({
    //     recipes : recipes
    //   })
    // });

    axios.get('api/recipes')
      .then((response) => {

        this.setState({
          recipes: response.data
        });
      })
      .catch((error) => {
        console.log(error);

        //TODO: handle this or log some telemtry in prod etc.

        throw error;
      });
  }

  render() {

    const recipeList = this.state.recipes;

    return <div>Hello World, here are my recipes: {recipeList.map((recipe, index, recipes) => {
        return <h1 key={index}>{recipe.name}</h1>
      })}</div>;
  }
}

module.exports = App;