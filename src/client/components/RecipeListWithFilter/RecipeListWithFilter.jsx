import React, { Component } from 'react';
import '../../scss/application.scss';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    InputGroup,
    InputGroupButton,
    Input,
    Button
} from 'reactstrap';

class RecipeListWithFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: this.props.recipes,
            inputField: undefined
        };
        //this.filter = undefined;
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleClick() {
        //Filter list based on filter value.
        //if matches an ingredient or recipe name or cooking time, it's a match.
        debugger;
        var filteredRecipes = this.props.recipeService.filterRecipes(this.props.recipes, this.state.inputfield);

        this.setState({
            recipes: filteredRecipes
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
    }

    componentDidUpdate(previousProps, previousState) {
        debugger;
        //check if props have changed, otherwise do nothing.
        if (!this.props.recipeService.compareRecipeLists(previousProps.recipes, this.props.recipes)) {
            debugger;
            this.setState({
                recipes: this.props.recipes
            });
        }
    }

    updateInputValue(evt) {
        this.setState({
            inputfield: evt.target.value
        });
    }

    render() {
        debugger;
        const recipeList = this.state.recipes;

        //Render image, name, cooking time, ingredients.
        if (recipeList) {
            return (
                <div>
                    <InputGroup>
                        <Input onKeyPress={this.handleKeyPress} onChange={this.updateInputValue} placeholder="Filter recipes here..." />
                        <InputGroupButton>
                            <Button className="glyphicon glyphicon-search" aria-hidden="true" color="secondary" onClick={this.handleClick}></Button>
                        </InputGroupButton>
                    </InputGroup>
                    <ListGroup>
                        {recipeList.map((recipe, index, recipes) => {
                            debugger;
                            return <ListGroupItem href={`/recipe/${recipe._id}`} action tag='a' key={index}>
                                <ListGroupItemHeading>{recipe.name}</ListGroupItemHeading>
                                <ListGroupItemText>{recipe.cookingTime}{recipe.mainIngredients.join(', ')}</ListGroupItemText>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                </div>);
        }
        else {
            return <div>Nothing to see here in HOME!</div>
        }
    }
}
module.exports = RecipeListWithFilter;