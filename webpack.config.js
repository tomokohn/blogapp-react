'use strict';

const webpack = require('webpack');
const path    = require('path');
const _       = require('lodash');

// Load Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');

// Settings
const packageConfig   = require('./package.json');
const vendorLibraries = Object.keys(packageConfig.dependencies);
const appEnv          = process.env.NODE_ENV || 'development';
const appPath         = path.join(__dirname, 'app');
const distPath        = path.join(__dirname, 'dist');
const exclude         = /node_modules/;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    // Chunk of vendor libraries based on `package.json`, excluding some
    vendor: _.pull(vendorLibraries,
      'bootstrap'
    )
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: '[name].[hash].js'
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),

    // Do not output to dist if there are errors
    new webpack.NoErrorsPlugin(),

    // Pass environment variable to frontend scipts
    new webpack.DefinePlugin({
      // We must envify CommonJS builds:
      // https://github.com/reactjs/redux/issues/1029
      'process.env.NODE_ENV': JSON.stringify(appEnv)
    })
  ],

  // Enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: [appPath]
  },

  module: {
    loaders: [
      // Allow `require`ing JSON files as objects
      {
        test: /\.json$/,
        loader: 'json'
      },

      // Expose React as global object
      {
        test: require.resolve('react'),
        loader: 'expose?React'
      },

      // Transpile ES6 and enable Hot Reload
      {
        test: /\.js$/,
        loaders: [
          'react-hot',
          'babel?cacheDirectory'
        ],
        exclude
      },

      // Allow `require`ing CSS files
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?root=' + encodeURIComponent(appPath)
        ]
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        loader: 'url?limit=5120&name=[path][name].[hash].[ext]'
      }

    ]
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true
  }

};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv !== 'test') {
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
      /* chunkName: */ 'vendor',
      /* filename: */ 'vendor.[hash].js'
    )
  );
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build related folders
    new CleanPlugin(['dist'])
  );
}

module.exports = config;
