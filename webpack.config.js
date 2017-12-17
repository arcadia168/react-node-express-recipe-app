var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  resolve: {
    root: __dirname,
    alias: {
      App: './src/client/components/App.jsx',
      Recipe: './src/client/components/Recipe/Recipe.jsx',
      RecipeListWithFilter: './src/client/components/RecipeListWithFilter/RecipeListWithFilter.jsx',
      Routes: './src/client/components/Routes/Routes.js',
      Home: './src/client/components/Home/Home.jsx',
      AuthService: './src/client/services/AuthService.js',
      HistoryService: './src/client/services/HistoryService.js',
      RecipeService: './src/client/services/RecipeService.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    rules: [{
        test: /(.scss|\.css)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jsx|js)?$/,
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ['react', 'es2015'] // Transpiles JSX and ES6
          }
        }]
      }
    ],

  }
};

module.exports = config;