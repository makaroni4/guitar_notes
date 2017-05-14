var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var path = require("path");
var fs = require('fs');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/app/"
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-2"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', use: 'css-loader!sass-loader' })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
        _: 'underscore'
    })
  ]
};

module.exports = config;
