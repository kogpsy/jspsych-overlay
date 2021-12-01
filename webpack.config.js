/*

Webpack configuration.

Author: Robin Bürkli <robuba.jr@gmx.ch>

*/

const path = require('path');
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'jspsych-overlay',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
