const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: 'assets/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: './dist',
    watchContentBase: true,
    open: true
  },

  // Loaders
  module: {
    rules : [
      // JavaScript (and ESLint)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },

      // CSS
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },

      // Templates
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },

  // Plugins
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new StyleLintPlugin({
      files: './src/styles/**/*.css'
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './dist/index.html'),
      template: './src/index.hbs',
      favicon: './src/images/favicon.png'
    })
  ]
};
