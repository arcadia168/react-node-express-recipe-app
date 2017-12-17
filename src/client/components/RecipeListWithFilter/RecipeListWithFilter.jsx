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
    Button,
    Container,
    Row,
    Col
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
        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
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
    }

    componentDidMount() {
        //TODO: move this function to run when render has finished
        //retrieve user profile and find user favourites;
        console.log('checking for favourites');
        if (this.props.auth.isAuthenticated()) {
            let storedUserProfile = this.props.auth.getUserProfile();

            //go and get favourites
            this.props.recipeService.getUserFavourites(storedUserProfile.sub, true).then((favourites) => {
                //if DIFFERENT to favourites on STATE
                this.setState({
                    userFavourites: favourites
                });
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

    addFavourite(recipeId) {
        debugger;
        let userId = this.props.auth.getUserProfile().sub;

        //mark the recipe for this user as a favourite on the server.
        if (this.props.auth.isAuthenticated() && userId) {
            this.props.recipeService.addFavouriteRecipeToUser(userId, recipeId)
                .then((updatedUserFavourites) => {
                    this.setState({
                        userFavourites: updatedUserFavourites
                    });
                })
                .catch((error) => {
                    consol.log(error);
                    //TODO: show bootstrap notification
                })
        } else {
            //TODO: display notification to tell user this didn't happen
        }
    }

    removeFavourite(recipeId) {
        debugger;
        let userId = this.props.auth.getUserProfile().sub;

        //mark the recipe for this user as a favourite on the server.
        if (this.props.auth.isAuthenticated() && userId) {
            this.props.recipeService.removeFavouriteRecipeFromUser(userId, recipeId)
                .then((updatedUserFavourites) => {
                    this.setState({
                        userFavourites: updatedUserFavourites
                    });
                })
                .catch((error) => {
                    console.log(error);
                    //TODO: show bootstrap notification to tell user something went wrong.
                })
        } else {
            //TODO: display notification to tell user this didn't happen
        }
    }

    render() {
        debugger;
        const recipeList = this.state.recipes;

        //map favourites onto list of available recipes.
        if (this.state.userFavourites) {

            this.state.recipes.forEach((recipe, i) => {
                this.state.recipes[i]['isFavourite'] = false;
            });

            this.state.userFavourites.forEach((favouriteRecipe, index) => {
                //find recipe with correspongind id and mark as a favourite
                for (let i = 0; i < this.state.recipes.length; i++) {
                    if (favouriteRecipe._id == this.state.recipes[i]._id) {
                        this.state.recipes[i]['isFavourite'] = true;
                    }
                }
            });
        }

        //Render image, name, cooking time, ingredients.
        if (recipeList) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <InputGroup className="filter">
                                <Input onKeyPress={this.handleKeyPress} onChange={this.updateInputValue} placeholder="Filter recipes here..." />
                                <InputGroupButton>
                                    <Button aria-hidden="true" color="secondary" onClick={this.handleClick}>Search</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <ListGroup>
                                {recipeList.map((recipe, index, recipes) => {

                                    let favouriteButton = undefined;

                                    if (this.props.auth.isAuthenticated()) {
                                        recipe.isFavourite ?
                                            favouriteButton = <Button onClick={() => { this.removeFavourite(recipe._id) }} size="lg" color="danger" className="pull-right">Unfavourite</Button>
                                            : favouriteButton = <Button onClick={() => { this.addFavourite(recipe._id) }} size="lg" color="success" className="pull-right">Mark as favourite</Button>
                                    }

                                    return <ListGroupItem key={index}>
                                        <ListGroupItemHeading tag="a" href={`/recipe/${recipe._id}`}>{recipe.name}</ListGroupItemHeading>
                                        <ListGroupItemText>
                                            Cooking Time: {recipe.cookingTime}
                                        </ListGroupItemText>
                                        <ListGroupItemText>
                                            Main Ingredients: {recipe.mainIngredients.join(', ')}{favouriteButton}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>);
        }
        else {
            return <div>Nothing to see here in HOME!</div>
        }
    }
}
module.exports = RecipeListWithFilter;