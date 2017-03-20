const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PRODENV = process.env.NODE_ENV === 'production';

const webpackConfig = {
  devtool: !PRODENV ? 'source-map' : false,
  devServer: {
    host: '0.0.0.0',
    noInfo: true,
  },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/app.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      rootDir: path.resolve(__dirname),
    },
    extensions: ['.js', '.json'],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    dgram: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {},
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      minify: {},
      template: './src/index.ejs',
      inject: 'body',
    }),
  ].concat(PRODENV ? [
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false },
      sourceMap: false,
    }),
  ] : []),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      // },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url?limit=8192',
      // },
      // {
      //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9](-alpha\.\d?)?)?$/,
      //   loader: 'url?limit=10000&minetype=application/font-woff',
      // },
      // {
      //   test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9](-alpha\.\d?)?)?$/,
      //   loader: 'file',
      // },
      // {
      //   test: /\.mp4$/,
      //   loader: 'url?mimetype=video/mp4',
      // },
      // { test: /\.json$/, loader: 'json' },
    ],
  },
};

module.exports = webpackConfig;
