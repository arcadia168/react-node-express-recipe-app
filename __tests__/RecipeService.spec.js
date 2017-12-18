import React from 'react';
import ReactDOM from 'react-dom';
import AuthService from 'AuthService';
import RecipeService from 'RecipeService';
import axios from 'axios';

const axiosInstance = axios;
const authInstance = new AuthService(axiosInstance);
const recipeServiceInstance = new RecipeService(axiosInstance);

var mockRecipes = require('../__mocks__/recipes.json');

describe('RecipeService', () => {
    it('instantiates without error', () => {
        expect(recipeServiceInstance).not.toBe(null);
    });

    describe('filterRecipes', () => {
        it ('should reduce a given list of recipes based on a filter term for a recipe name', () => {
            //Arrange
            let recipesToFilter = mockRecipes;
            let filterTerm = 'chicken ceasar salad';

            //Act
            let filteredRecipes = recipeServiceInstance.filterRecipes(recipesToFilter, filterTerm);

            //Assert
            expect(filteredRecipes).toHaveLength(1);
            expect(filteredRecipes[0].name).toEqual('Chicken Ceasar Salad');
        });

        it ('should reduce a given list of recipes based on a filter term for an ingredient', () => {
            //Arrange
            let recipesToFilter = mockRecipes;
            let filterTerm = 'lettuce'; //ensure ingredient is not also in a recipe name

            //Act
            let filteredRecipes = recipeServiceInstance.filterRecipes(recipesToFilter, filterTerm);

            //Assert
            expect(filteredRecipes).toHaveLength(2);
            expect(filteredRecipes[0].mainIngredients[0]).toEqual('Lettuce');
        });

        it('should reduce a given list of recipes based on a filter term for maximum cooking time', () => {
            //Arrange
            let recipesToFilter = mockRecipes;
            let filterTerm = '26 minutes';

            //Act
            let filteredRecipes = recipeServiceInstance.filterRecipes(recipesToFilter, filterTerm);

            //Assert
            expect(filteredRecipes).toHaveLength(1);
            expect(filteredRecipes[0].cookingTime).toEqual('25 minutes');
        })
    });
});