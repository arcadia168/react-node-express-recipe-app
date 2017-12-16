import React from 'react';
import { Router, Route } from 'react-router-dom';
import App from '../App.jsx';
import Callback from '../Callback/Callback.jsx';
import HistoryService from '../../services/HistoryService';
import AuthService from '../../services/AuthService';
import axios from 'axios';

const auth = new AuthService();
const axiosInstance = axios;
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={HistoryService} component={App}>
      <div>
        <Route path="/" render={(props) => <App axios={axiosInstance} auth={auth} {...props}/>}/>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);

          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}