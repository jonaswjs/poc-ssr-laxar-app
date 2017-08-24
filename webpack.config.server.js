/**
 * Copyright 2017
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
   .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
   })
   .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
   });

//console.log('Node Modules: '+ JSON.stringify(nodeModules));
module.exports =

   {
      // The configuration for the server-side rendering
      name: 'server',
      devtool: 'source-map',
      target: 'node',
      entry: './init-server.js',
      output: {
         path: path.resolve( __dirname, 'build/' ),
         publicPath: 'build/',
         filename: 'init-server.js'
      },
      plugins: [
         new webpack.BannerPlugin( {
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false
         } )
      ],
      externals: nodeModules,
      resolve: {
         modules: [ path.resolve( __dirname, 'node_modules' ) ],
         extensions: [ '.js' ],
         alias: {
            'laxar': path.resolve(__dirname, 'application/lib/laxar' ),
            'default.theme': path.resolve(__dirname, '../application/lib/laxar-uikit/theme/default.theme' )
         }
      },
      module: {
         loaders: [
            { test: /\.js$/,

               loaders: [
                  'babel-loader'
               ]
            },
            { test:  /\.json$/, loader: 'json-loader' }
         ]
      }
   };

