import React, { Component } from 'react';
import '../../scss/application.scss';
import { FormGroup, InputGroup, FormControl, ListGroup, Glyphicon, ListGroupItem } from 'react-bootstrap';

class RecipeListWithFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: this.props.recipes,
        };
    }

    render() {
        debugger;
        const recipeList = this.props.recipes;

        //Render image, name, cooking time, ingredients.
        if (recipeList) {
            return (
                <div>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" />
                            <InputGroup.Addon>
                                <Glyphicon glyph="music" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <ListGroup>Hello World, here are my recipes: {recipeList.map((recipe, index, recipes) => {
                        return <ListGroupItem href={`/recipe/${recipe._id}`} header={recipe.name} key={index}>{recipe.cookingTime}{recipe.mainIngredients.join(', ')}</ListGroupItem>
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