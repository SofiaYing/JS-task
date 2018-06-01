const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
//如果我们更改了我们的一个入口起点的名称，甚至添加了一个新的名称，
//生成的包将被重命名在一个构建中，但是我们的index.html文件仍然会引用旧的名字。
//我们用 HtmlWebpackPlugin 来解决这个问题。
const CleanWebpackPlugin = require('clean-webpack-plugin');
//在每次构建前清理 /dist 文件夹
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject:'body'
    }),
    new ExtractTextPlugin("styles.css"),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
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