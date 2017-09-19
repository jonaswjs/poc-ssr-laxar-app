const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const webpack = require( 'webpack' );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getConfig() {

   const outputPath = 'build/';

   return {
      devtool: '#source-map',
      entry: {
         'init-client': './init-client.js'
      },

      output: {
         path: path.resolve( __dirname, outputPath ),
         publicPath: outputPath,
         filename: '[name].bundle.js'
      },

      plugins: [
         ...[ new ExtractTextPlugin( { filename: '[name].bundle.css' } ) ],
         new webpack.optimize.ModuleConcatenationPlugin()
      ],

      resolve: {
         modules: [ path.resolve( __dirname, 'node_modules' ) ],
         extensions: [ '.js' ],
         alias: {
            'laxar': path.resolve(__dirname, 'application/lib/laxar-client' ),
            'default.theme': path.resolve(__dirname, '../application/lib/laxar-uikit/theme/default.theme' )
         }
      },

      module: {
         rules: [
            {
               test: /.js$/,
               exclude: /node_modules/,
               loader: 'babel-loader'
            },
            {
               test: /.spec.js$/,
               exclude: /node_modules/,
               loader: 'laxar-mocks/spec-loader'
            },
            {  // load styles, images and fonts with the file-loader
               // (out-of-bundle in build/assets/)
               test: /\.(gif|jpe?g|png|ttf|woff2?|svg|eot|otf)(\?.*)?$/,
               loader: 'file-loader',
               options: {
                  name: 'assets/[path]-[name].[ext]'
               }
            },
            {  // ... after optimizing graphics with the image-loader ...
               test: /\.(gif|jpe?g|png|svg)$/,
               loader: 'img-loader?progressive=true'
            },
            {  // ... and resolving CSS url()s with the css loader
               // (extract-loader extracts the CSS string from the JS module returned by the css-loader)
               test: /\.(css|s[ac]ss)$/,
               loader: ExtractTextPlugin.extract( {
                  fallback: 'style-loader',
                  use: 'css-loader',
                  publicPath: ''
               } )
            },
            {
               test: /[/]default[.]theme[/].*[.]s[ac]ss$/,
               loader: 'sass-loader',
               options: require( 'laxar-uikit/themes/default.theme/sass-options' )
            }
         ]
      }
   };

}

const configuration = getConfig();
module.exports = configuration;
