'use strict'
const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    "./index.js",
    "./index.scss"
  ],
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].js",
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
        use: ExtractTextPlugin.extract({
          use: [
            "css-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ExtractTextPlugin("index.css")
  ]
}
