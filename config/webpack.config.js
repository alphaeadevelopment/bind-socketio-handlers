/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const babelExclude = /node_modules/;

const alias = {
};
if (process.env.NODE_ENV !== 'production' && process.env.NO_STUBS === undefined) {
};

var config = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.join(__dirname, '..'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: babelExclude,
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias
  },
  externals: {
  },
  plugins: [
  ],
  target: 'node'
}
console.log('Aliases: %o', config.resolve.alias);
module.exports = config
