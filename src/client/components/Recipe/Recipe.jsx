import React, { Component } from 'react';
import '../../scss/application.scss';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_id: this.props.match ? this.props.match.params.recipe_id : undefined,
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
            return <Container>
                <Row>
                    <Col md="10" className="col-centered">
                        <Jumbotron fluid>
                            <Container fluid>
                                <div>
                                    <h1 className="display-5">{recipe.name}</h1>
                                </div>
                                <img className="recipe-img img-responsive" src={recipe.image} />
                                <div className="recipe-cooking-time lead">Cooking Time: {recipe.cookingTime}</div>
                                <div className="recipe-ingredients">
                                    Ingredients: 
                                    {recipe.ingredients.map((ingredient, index) => {
                                        return <div key={index}>{ingredient.quantity} x {ingredient.name}</div>
                                    })}
                                </div>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        } else if (this.state.error) {
            return <div>{this.state.error}</div>
        } else {
            return <div>Nothing to see here in RECIPE!</div>
        }
    }
}
module.exports = Recipe;