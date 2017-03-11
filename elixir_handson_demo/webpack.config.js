'use strict'
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: {
    'index.js': './index.js',
    "index.css": "./index.scss"
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
      },
      {
        test: /.scss/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"},
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  }
}
