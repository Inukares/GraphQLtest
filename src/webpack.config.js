'use strict';
var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: './App.js',
  devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
   /* proxy: {
      '/api': 'http://127.0.0.1:50545'
    } */
  }
};