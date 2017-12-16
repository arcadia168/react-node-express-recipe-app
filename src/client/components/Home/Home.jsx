import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../../scss/application.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
        };
    }

    componentDidMount() {
        //then make a call for recipes
        this.props.recipeService.getRecipes(false).then((recipes) => {
            this.setState({
                recipes: recipes
            })
        });
    }

    render() {
        const recipeList = this.state.recipes;

        if (recipeList) {
            return <ListGroup>Hello World, here are my recipes: {recipeList.map((recipe, index, recipes) => {
                return <ListGroupItem href={`/recipe/${recipe._id}`} header={recipe.name} key={index}>{recipe.cookingTime}{recipe.mainIngredients.join(', ')}</ListGroupItem>
            })} 
            </ListGroup>;
        }
        else {
            return <div>Nothing to see here in HOME!</div>
        }
    }
}
module.exports = Home;