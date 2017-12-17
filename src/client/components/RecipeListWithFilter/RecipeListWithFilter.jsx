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
            inputField: undefined,
            userFavourites: undefined
        };
        //this.filter = undefined;
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    handleClick() {
        //Filter list based on filter value.
        //if matches an ingredient or recipe name or cooking time, it's a match.
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
        //check if props have changed, otherwise do nothing.
        if (!this.props.recipeService.compareRecipeLists(previousProps.recipes, this.props.recipes)) {
            this.setState({
                recipes: this.props.recipes
            });
        }

        //retrieve user profile and find user favourites;
        if (this.props.auth.isAuthenticated()) {
            let storedUserProfile = this.props.auth.getUserProfile();

            //go and get favourites
            this.props.recipeService.getUserFavourites(storedUserProfile.sub, true).then((favourites) => {
                //if DIFFERENT to favourites on STATE
                if (!this.props.recipeService.compareUserFavourites(previousState.userFavourites, favourites)) {
                    this.setState({
                        userFavourites: favourites
                    });
                }
            }).catch((error) => {
                console.log('an error occurred retrieving user favourites');
            });
        }
    }

    updateInputValue(evt) {
        this.setState({
            inputfield: evt.target.value
        });
    }

    render() {
        const recipeList = this.state.recipes;

        console.log('user profile for recipe list is: ' + JSON.stringify(this.state.userProfile));

        //map favourites onto list of available recipes.
        if (this.state.userFavourites) {
            this.state.userFavourites.forEach((favouriteRecipe, index) => {
                //find recipe with correspongind id and mark as a favourite
                for (let i = 0; i < this.state.recipes.length; i++) {
                    if (favouriteRecipe._id == this.state.recipes[i]._id) {
                        debugger;
                        this.state.recipes[i]['isFavourite'] = true
                    }
                }
            });
        }

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

                            let starred = undefined;

                            if (recipe.isFavourite === true) {
                                starred = 'I LOVE THIS';
                            } else if (recipe.isFavourite === false){
                                starred = 'THIS IS OK';
                            }

                            return <ListGroupItem href={`/recipe/${recipe._id}`} action tag='a' key={index}>
                                <ListGroupItemHeading>{recipe.name}{starred}</ListGroupItemHeading>
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