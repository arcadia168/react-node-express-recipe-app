import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../Home/Home.jsx';
import Callback from '../Callback/Callback.jsx';
import Recipe from '../Recipe/Recipe.jsx';
import RecipeService from '../../services/RecipeService';
import HistoryService from '../../services/HistoryService';
import AuthService from '../../services/AuthService';
import axios from 'axios';

const axiosInstance = axios;
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
const recipeService = new RecipeService(axiosInstance);
const authInstance = new AuthService(axiosInstance);

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    authInstance.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={HistoryService} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={authInstance} {...props}/>}/>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
        <Route path="/home" render={(props) => <Home auth={authInstance} recipeService={recipeService} />} />
        <Route path="/recipe/:recipe_id" render={(props) => <Recipe axios={axiosInstance} recipeService={recipeService} {...props} />}/>
      </div>
    </Router>
  );
};