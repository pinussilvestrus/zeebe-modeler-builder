'use strict';

const DEV = process.env.NODE_ENV === 'development';

const clientPath = process.env.CLIENT_PATH;

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = {
  mode: DEV ? 'development' : 'production',
  target: 'electron-renderer',
  entry: {
    bundle: [__dirname + '/src/index.js']
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  resolve: DEV && {
    mainFields: [ 'browser', 'dev:module', 'module', 'main' ]
  } || { },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // apply loaders, falling back to file-loader, if non matches
      {
        oneOf: [
          {
            test: /\.(bpmn|cmmn|dmn)$/,
            use: 'raw-loader'
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              cssLoader()
            ]
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              cssLoader(),
              'less-loader'
            ]
          },
          {
            // exclude files served otherwise
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CopyWebpackPlugin([
      {
        from: clientPath + '/public',
        transform: DEV && applyDevCSP
      }
    ]),
    new DefinePlugin({
      'process.env': {
        'TABS_PROVIDER': JSON.stringify(process.env.TABS_PROVIDER)
      }
    })
  ],
  // don't bundle shims for node globals
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map'
};



// helpers //////////////////////


function cssLoader() {

  if (DEV) {
    return {
      loader: 'css-loader',
      options: {
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    };
  } else {
    return 'css-loader';
  }
}

/**
 * Patch index.html CSP directive to make sure we can use
 * unsafe-eval in development mode. It is the fastest way
 * to get per module source maps.
 */
function applyDevCSP(content, path) {
  if (/index\.html$/.test(path)) {
    const html = content.toString('utf8');

    return (
      html.replace(
        '<meta http-equiv="Content-Security-Policy" content="script-src \'self\'" />',
        ''
      )
    );
  }

  return content;
}