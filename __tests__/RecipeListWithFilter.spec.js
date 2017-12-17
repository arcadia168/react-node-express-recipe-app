import React from 'react';
import ReactDOM from 'react-dom';
import RecipeListWithFilter from 'RecipeListWithFilter';
import AuthService from 'AuthService';
import RecipeService from 'RecipeService';
import axios from 'axios';
import renderer from 'react-test-renderer';
const axiosInstance = axios;
const recipeServiceInstance = new RecipeService(axiosInstance);
const authInstance = new AuthService(axiosInstance);

describe('RecipeListWithFilter', () => {
    it('renders correctly', () => {
        const tree = renderer
          .create(<RecipeListWithFilter axios={axiosInstance} recipeService={recipeServiceInstance} auth={authInstance} recipes={[]}/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});