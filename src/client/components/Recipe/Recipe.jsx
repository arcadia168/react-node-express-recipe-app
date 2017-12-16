import React, { Component } from 'react';
import '../../scss/application.scss';
//import RecipeService from '../../services/RecipeService'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_id: this.props.match.params.recipe_id,
            recipe: undefined,
            error: undefined
        };
    }

    //before mounting, check store for recipe
    componentWillMount() {
        this.props.recipeService.getRecipeById(this.state.recipe_id, true).then((recipe) => {
            this.setState({
                recipe: recipe
            });
        }).catch((error) => {
            //TODO: handle this error in some way.
            if (error && error.status == '404') {
                this.setState({
                    error: "This recipe doesn't exist!"
                });
            }
        });
    }

    //todo: Make call to server to toggle a favourite recipe 

    render() {
        const recipe = this.state.recipe;

        //Render image, name, cooking time, ingredients.
        if (this.state.recipe) {
            return <div>
                <img src={recipe.image} />
                <div>{recipe.cookingTime}</div>
                <div>
                    {recipe.ingredients.map((ingredient, index) => {
                        return <span key={index}>{ingredient.quantity}{ingredient.name}</span>
                    })}
                </div>
            </div>
        } else if (this.state.error) {
            return <div>{this.state.error}</div>
        } else {
            return <div>Nothing to see here in RECIPE!</div>
        }
    }
}
module.exports = Recipe;