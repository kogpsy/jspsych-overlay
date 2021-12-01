/*

Webpack configuration.

Author: Robin Bürkli <robuba.jr@gmx.ch>

*/

const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devServer: {
    // This path will be served
    static: path.join(__dirname, 'build'),
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
