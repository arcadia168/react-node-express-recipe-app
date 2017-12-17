import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import RecipeListWithFilter from '../RecipeListWithFilter/RecipeListWithFilter.jsx';
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
            return <RecipeListWithFilter axios={this.props.axios} auth={this.props.auth} recipeService={this.props.recipeService} recipes={recipeList} />
        }
        else {
            return <div>Nothing to see here in HOME!</div>
        }
    }
}
module.exports = Home;