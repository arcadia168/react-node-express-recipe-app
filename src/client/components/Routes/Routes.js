import { Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import App from '../App.jsx';
import Callback from '../Callback/Callback.jsx';
import Recipe from '../Recipe/Recipe.jsx';
import RecipeService from '../../services/RecipeService';
import HistoryService from '../../services/HistoryService';
import AuthService from '../../services/AuthService';
import axios from 'axios';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.authInstance = new AuthService();
    this.axiosInstance = axios;
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    this.recipeService = new RecipeService(axiosInstance);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication(nextState, replace) {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      authInstance.handleAuthentication();
    }
  }

  render() {
    debugger;
    return (
      <Router history = {HistoryService} component={App}>
        <div>
          <Route path = "/" render={
            (props) => {
              return <App axios={this.axiosInstance} auth={this.authInstance} recipeService={recipeService}{ ...props}/>
            }
          }/>
          <Route path = "/callback" render={
            (props) => {
              this.handleAuthentication(props);
              return <Callback { ...props}/> 
            }
          }/> 
          <Route path = "/recipe/:recipe_id" recipeService={this.recipeService} render={
            (props) => {
              return <Recipe { ...props}/>
            }
          }/>
        </div>
      </Router>
    );
  }
}
module.exports = Routes;