import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'Home';
import HistoryService from 'HistoryService';
import AuthService from 'AuthService';
import RecipeService from 'RecipeService';
import axios from 'axios';
import renderer from 'react-test-renderer';
const axiosInstance = axios;
const recipeServiceInstance = new RecipeService(axiosInstance);
const authInstance = new AuthService(axiosInstance);

describe('Home', () => {
    it('renders correctly', () => {
        const tree = renderer
          .create(<Home axios={axiosInstance} recipeService={recipeServiceInstance} auth={authInstance}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});