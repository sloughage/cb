const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
