import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Callback from './Callback/Callback.jsx';
import Auth from './Auth/Auth';
import history from './history';
import RecipeService from '../services/RecipeService';
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" render={(props) => <Home auth={auth} RecipeService={new RecipeService()} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}