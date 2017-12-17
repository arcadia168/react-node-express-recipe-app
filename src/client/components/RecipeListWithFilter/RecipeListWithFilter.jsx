import React, { Component } from 'react';
import '../../scss/application.scss';
import {
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    InputGroupAddon,
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
            userFavourites: undefined,
            showOnlyFavourites: false,
            favouritesButtonActive: false,
            searchButtonActive: false
        };
        //this.filter = undefined;
        this.handleRecipeSearch = this.handleRecipeSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.addFavourite = this.addFavourite.bind(this);
        this.removeFavourite = this.removeFavourite.bind(this);
        this.toggleFavourites = this.toggleFavourites.bind(this);
    }

    handleRecipeSearch() {
        debugger;
        if (!this.state.searchButtonActive && this.state.inputfield) {
            //Filter list based on filter value.
            //if matches an ingredient or recipe name or cooking time, it's a match.
            var filteredRecipes = this.props.recipeService.filterRecipes(this.props.recipes, this.state.inputfield);

            this.setState({
                recipes: filteredRecipes,
                searchButtonActive: true
            });
        } else if (this.state.searchButtonActive) {
            //show all recipes again.
            this.setState({
                recipes: this.props.recipes,
                searchButtonActive: false
            })
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleRecipeSearch();
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

    toggleFavourites() {
        this.setState({
            showOnlyFavourites: !this.state.showOnlyFavourites,
            favouritesButtonActive: !this.state.favouritesButtonActive
        })
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
        let recipeList = this.state.recipes;

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

        if (this.state.showOnlyFavourites) {
            //filter the non-favourites out of the copy of the recipe list, which is used for display
            debugger;
            recipeList = recipeList.filter((recipe) => {
                for (let i = 0; i < this.state.userFavourites.length; i++) {
                    if (this.state.userFavourites[i]._id === recipe._id) {
                        return true;
                    }
                }
            });
            debugger;
        }

        //Render image, name, cooking time, ingredients.
        if (recipeList) {
            return (
                <Container>
                    <Row>
                        <Col>
                            <InputGroup>
                                {this.props.auth.isAuthenticated() ? <InputGroupButton onClick={this.toggleFavourites} color="secondary">
                                    {this.state.favouritesButtonActive ? 'Show All' : 'Show Favourites'}
                                </InputGroupButton> : undefined}
                                <Input onKeyPress={this.handleKeyPress} onChange={this.updateInputValue} placeholder="Filter recipes here..." />
                                <InputGroupButton color="secondary" onClick={this.handleRecipeSearch}>
                                    {this.state.searchButtonActive ? 'Clear Search': 'Search'}
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
                                            favouriteButton = <Button onClick={() => { this.removeFavourite(recipe._id) }} color="danger" className="favourite-btn">Unfavourite</Button>
                                            : favouriteButton = <Button onClick={() => { this.addFavourite(recipe._id) }} color="success" className="favourite-btn">Mark as favourite</Button>
                                    }

                                    return <ListGroupItem key={index}>
                                        <ListGroupItemHeading tag="a" href={`/recipe/${recipe._id}`}>{recipe.name}</ListGroupItemHeading>
                                        <ListGroupItemText>
                                            Cooking Time: {recipe.cookingTime} {favouriteButton}
                                        </ListGroupItemText>
                                        <ListGroupItemText>
                                            Main Ingredients: {recipe.mainIngredients.join(', ')}
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