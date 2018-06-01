const path = require('path');
const webpack = require('webpack');
//const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // 代码分离
    index:'./src/index.js',
    //another:"./src/tabs.js"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
     ]
   }
};

  