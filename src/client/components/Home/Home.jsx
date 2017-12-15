import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import '../../scss/application.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };
    }

    componentDidMount() {
        //make api request for recipes

        //TODO: get call working using a service class
        this.props.RecipeService.getRecipes().then((recipes) => {
            this.setState({
                recipes: recipes
            })
        });
    }

    render() {
        const recipeList = this.state.recipes;

        if (recipeList) {
            return <div>Hello World, here are my recipes: {recipeList.map((recipe, index, recipes) => {
                return <h1 key={index}>{recipe.name}</h1>
            })}
            </div >;
        }
        else {
            return <div>Nothing to see here!</div>
        }
    }
}
module.exports = Home;