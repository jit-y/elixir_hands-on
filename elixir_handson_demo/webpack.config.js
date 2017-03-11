'use strict'
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: {
    'index.js': './index.js'
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name]",
    publicPath: "http://localhost:8080/assets"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  }
}
