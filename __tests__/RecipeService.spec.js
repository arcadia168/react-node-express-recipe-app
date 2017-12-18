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

    describe('searchMatchingRecipeIngredients', () => {
        it('should return true when a recipe has a matching ingredient', () => {
            //Arrange
            let filterTerm = 'chicken';
            let recipe = mockRecipes[0];

            //Assert
            let ingredientExistsCheckResult = recipeServiceInstance.searchMatchingRecipeIngredients(recipe, filterTerm);
        
            expect(ingredientExistsCheckResult).toBe(true);
        })

        it('should return false when a recipe does not contain the ingredient being searched for', () => {
            let filterTerm = 'raisins';
            let recipe = mockRecipes[0];

            //Assert
            let ingredientExistsCheckResult = recipeServiceInstance.searchMatchingRecipeIngredients(recipe, filterTerm);
        
            expect(ingredientExistsCheckResult).toBe(false);
        })
    })

    describe('compareRecipeLists', () => {
        it('should return true for an identical pair of recipe lists', () => {
            //Arrange
            let firstRecipeList = mockRecipes;
            let comparisonRecipeList = mockRecipes;

            //Act
            let comparisonResult = recipeServiceInstance.compareRecipeLists(firstRecipeList, comparisonRecipeList);

            //Assert
            expect(comparisonResult).toBe(true);
        })

        it('should return false for an differing pair of recipe lists, based on length', () => {
            //Arrange
            let firstRecipeList = mockRecipes;
            let comparisonRecipeList = ['test', 'test'];

            //Act
            let comparisonResult = recipeServiceInstance.compareRecipeLists(firstRecipeList, comparisonRecipeList);

            //Assert
            expect(comparisonResult).toBe(false);
        })
    })
});