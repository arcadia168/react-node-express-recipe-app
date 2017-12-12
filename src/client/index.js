import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import RecipeService from './services/recipeService.js'

import styles from './scss/application.scss';

render(
  <App RecipeService={new RecipeService()}/>,
  document.getElementById('root')
);