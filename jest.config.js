module.exports = {
    moduleFileExtensions: [
        "js",
        "jsx"
    ],
    moduleDirectories: [
        "node_modules"
    ],
    setupFiles: [
        "jest-localstorage-mock"
    ],
    moduleNameMapper: {
        "^.+\\.scss$": "<rootDir>/__mocks__/style-mock.js",
        'App': '<rootDir>/src/client/components/App.jsx',
        'RecipeService': '<rootDir>/src/client/services/RecipeService.js',        
        'Recipe': '<rootDir>/src/client/components/Recipe/Recipe.jsx',
        'RecipeListWithFilter': '<rootDir>/src/client/components/RecipeListWithFilter/RecipeListWithFilter.jsx',
        'Routes': '<rootDir>/src/client/components/Routes/Routes.js',
        'Home': '<rootDir>/src/client/components/Home/Home.jsx',
        'AuthService': '<rootDir>/src/client/services/AuthService.js',
        'HistoryService': '<rootDir>/src/client/services/HistoryService.js',
        'Callback': '<rootDir>/src/client/components/Callback/Callback.jsx'
    }
}