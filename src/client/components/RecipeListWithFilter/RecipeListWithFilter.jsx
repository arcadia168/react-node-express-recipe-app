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
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleClick() {
        console.log("value of input field : " + this.state.inputfield);
    }

    updateInputValue(evt) {
        this.state = { inputfield: evt.target.value };
    }

    render() {
        debugger;
        const recipeList = this.props.recipes;

        //Render image, name, cooking time, ingredients.
        if (recipeList) {
            return (
                <div>
                    <InputGroup>
                        <Input onChange={this.updateInputValue} placeholder="Filter recipes here..." />
                        <InputGroupButton>
                            <Button color="secondary" onClick={this.handleClick}>Search</Button>
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