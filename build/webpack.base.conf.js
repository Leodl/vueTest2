'use strict'
var webpack = require("webpack") //默认没有
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
<<<<<<< HEAD
      'assets': resolve('assets'),
      'static': resolve('static'),
<<<<<<< HEAD
=======
      'assets':  resolve('assets'),
      'static': resolve('static')
>>>>>>> de6506c831a9ca261b8a26427099abb214399467
=======
>>>>>>> 019b9e2ae89c139bab824a0e49e99cc797b2d1f0
      'components': path.resolve(__dirname, '../src/components'),
      jquery: "jquery"
    }
  },
  //添加代码
 plugins: [
      new webpack.optimize.CommonsChunkPlugin('common.js'),
      new webpack.ProvidePlugin({
          jQuery: "jquery",
          $: "jquery"
      })

   ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test:/\.css$/,
        loader: "style-loader!css-loader",
        include: [resolve('src'),resolve('src/assets'), resolve('test'), resolve('node_modules/webpack-dev-server/client')] 
      },
      {

        test: /\.less$/,

        loader: "style-loader!css-loader!less-loader",

      },
      {
        test: /\.js$/,
  
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }

}
