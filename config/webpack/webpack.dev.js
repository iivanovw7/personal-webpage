const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify('development')
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, './../../', './assets/icons/dev-favicon.png'),
        to: path.join(__dirname, './../../dist/', './assets/img/favicon.png')
      }
    ])
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 4449,
    hot: true
  }
});
