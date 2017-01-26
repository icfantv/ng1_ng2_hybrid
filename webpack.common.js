const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const NODE_MODULE_PATH = path.join(__dirname, 'node_modules');
const fs = require('fs');

function configure(IS_TEST) {

  function getTypescriptLinterLoader() {
    return {
      enforce: 'pre',
      test: IS_TEST ? /\.spec.ts$/ : /\.ts$/,
      use: 'tslint-loader'
    };
  }

  function getJavascriptLoader() {
    return {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    };
  }

  const config = {
    output: IS_TEST ? undefined : {
        path: path.join(__dirname, 'build', 'webpack'),
        filename: '[name].js'
      },
    resolveLoader: IS_TEST ? {} : {
        modules: [
          NODE_MODULE_PATH
        ],
        moduleExtensions: ['-loader']
      },
    resolve: {
      extensions: ['.js', '.ts', '.html'],
      modules: [
        NODE_MODULE_PATH,
        path.join(__dirname, 'src')
      ]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    devServer: IS_TEST ? {} : {
        port: 9000,
        host: 'localhost',
        https: false
      },
    watch: IS_TEST
  };

  config.module.rules.push(getTypescriptLinterLoader(), getJavascriptLoader());
  if (IS_TEST) {
    config.plugins = [];
  } else {

    config.entry = {
      app: './src/app.ts',
      vendor: [
        'angular', 'reflect-metadata', 'zone.js',
        '@angular/platform-browser', '@angular/platform-browser-dynamic', '@angular/core', '@angular/common'
      ]
    };

    config.plugins = [
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, __dirname),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
      new webpack.optimize.CommonsChunkPlugin('init'),
      new HtmlWebpackPlugin({
        title: 'Hello World',
        template: './src/index.template',
        inject: true,
        chunksSortMode: (a, b) => {
          const chunks = ['init', 'vendor', 'app'];
          return chunks.indexOf(a.names[0]) - chunks.indexOf(b.names[0]);
        }
      })
    ];
  }

  // this is temporary and will be deprecated in WP3.  moving forward,
  // loaders will individually need to accept this as an option.
  config.plugins.push(new webpack.LoaderOptionsPlugin({debug: !IS_TEST}));

  return config;
}

module.exports = configure;
